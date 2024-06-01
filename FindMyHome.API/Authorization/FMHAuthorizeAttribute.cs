using FindMyHome.Common;
using FindMyHome.Common.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using Schedent.Common.Enums;
using System.IdentityModel.Tokens.Jwt;

namespace Schedent.API.Authorization;

[AttributeUsage(AttributeTargets.All)]
public class FMHAuthorizeAttribute : Attribute, IAuthorizationFilter
{
    private readonly int[] _userRoles;

    public FMHAuthorizeAttribute()
    {
        _userRoles = new int[]
        {
           (int) UserRoleType.Admin,
           (int) UserRoleType.User
        };
    }

    public FMHAuthorizeAttribute(UserRoleType userRole)
    {
        _userRoles = new int[]
        {
            (int) userRole
        };
    }

    // Constructor with list of user roles parameter
    // Initialize the user roles list with the given user roles
    public FMHAuthorizeAttribute(UserRoleType[] userRoles)
    {
        _userRoles = (int[])userRoles.Select(ur => (int)ur);
    }

    // Method used on endpoints with SchedentAuthorizeAttribute applied
    // Check is the logged in user has the correct role for performing the desired request
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        try
        {
            // Retrieve the token from the request header
            var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                // Reads and validates the token
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Settings.TokenSecretBytes),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                // Retrieve the user role id from the token claims
                _ = int.TryParse(jwtToken.Claims.FirstOrDefault(x => x.Type == ((int)TokenClaim.UserRoleId).ToString())?.Value, out var userRoleId);

                // The user role found in the claims must be in the user roles list
                // Otherwise the user is not authorized to perform the request
                if (!_userRoles.Contains(userRoleId))
                {
                    context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
                }
            }
            // If the token is null it means that the user is not logged in
            // therefore it should not be allowed to perform requests
            else
            {
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
        // In case an error occurs while validating the role
        // Throw unauthorized error
        catch
        {
            context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }

    }
}
