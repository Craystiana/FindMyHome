using FindMyHome.BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FindMyHome.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FavoriteController : BaseController
{
    private readonly FavoriteService _favoriteService;
    private readonly ILogger<UserController> _logger;

    public FavoriteController(FavoriteService favoriteService, ILogger<UserController> logger)
    {
        _favoriteService = favoriteService;
        _logger = logger;
    }

    [HttpPost]
    [Route("Add")]
    public IActionResult Add([FromQuery] int listingId)
    {
        try
        {
            _favoriteService.Add((int)CurrentUserId, listingId);

            return new JsonResult(true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while adding favorite ");
            return StatusCode((int)HttpStatusCode.InternalServerError);
        }
    }

    [HttpPost]
    [Route("Delete")]
    public IActionResult Register([FromQuery] int listingId)
    {
        try
        {
            _favoriteService.Delete((int)CurrentUserId, listingId);

            return new JsonResult(true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while deleting favorite ");
            return StatusCode((int)HttpStatusCode.InternalServerError);
        }
    }

    [HttpGet]
    [Route("List")]
    public IActionResult GetFavorites()
    {
        try
        {
            return new JsonResult(_favoriteService.GetList((int)CurrentUserId));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while getting the user details");
            return StatusCode((int)HttpStatusCode.InternalServerError);
        }
    }
}
