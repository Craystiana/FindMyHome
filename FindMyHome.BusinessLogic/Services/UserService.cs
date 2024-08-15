using FindMyHome.Common.Enums;
using FindMyHome.Domain.DTO.User;
using FindMyHome.Domain.Entities;
using FindMyHome.Domain.Interfaces;
using Schedent.Common.Enums;
using System.Security.Cryptography;
using System.Text;

namespace FindMyHome.BusinessLogic.Services;

public class UserService : BaseService
{
    public UserService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

    public User Register(RegisterModel model)
    {
        User user = null;

        model.Email = model.Email.Replace(" ", string.Empty);

        if (UnitOfWork.UserRepository.Get(model.Email) == null)
        {
            var salt = GenerateSalt();

            user = new User
            {
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserRoleId = (int)UserRoleType.User,
                Salt = salt,
                PasswordHash = CreatePasswordHash(model.Password, salt),
                PhoneNumber = model.PhoneNumber,
            };

            UnitOfWork.UserRepository.Add(user);
        }

        Save();

        return user;
    }

    public User Login(string email, string password)
    {
        var user = UnitOfWork.UserRepository.Get(email.Replace(" ", string.Empty));

        if (user?.PasswordHash == CreatePasswordHash(password, user?.Salt))
        {
            return user;
        }
        else
        {
            return null;
        }
    }

    private static string GenerateSalt()
    {
        byte[] salt = new byte[50 / 8];

        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        return Convert.ToBase64String(salt);
    }

    private static string CreatePasswordHash(string password, string salt)
    {
        var sha1 = SHA1.Create();
        var hashedBytes = sha1.ComputeHash(Encoding.UTF8.GetBytes(password + salt));
        return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
    }

    public UserDetails GetUserDetails(int userId)
    {
        var user = UnitOfWork.UserRepository.GetDetails(userId);

        return new UserDetails
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber
        };
    }

    public void EditProfile(UserDetails model, int userId)
    {
        var user = UnitOfWork.UserRepository.Get(userId);

        user.FirstName = model.FirstName;
        user.LastName = model.LastName;
        user.Email = model.Email;

        UnitOfWork.SaveChanges();
    }

    public void EditDeviceToken(int userId, string token)
    {
        var user = UnitOfWork.UserRepository.Get(userId);

        user.DeviceToken = token;

        UnitOfWork.SaveChanges();
    }

    public int GetLoggedInUserId(string token)
    {
        return int.Parse(JwtService.GetClaim(TokenClaim.UserId, token));
    }
}
