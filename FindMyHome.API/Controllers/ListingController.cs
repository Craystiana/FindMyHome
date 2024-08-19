using FindMyHome.BusinessLogic.Services;
using FindMyHome.Domain.DTOs.Listing;
using Microsoft.AspNetCore.Mvc;

namespace FindMyHome.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ListingController : BaseController
{
    private readonly ListingService _listingService;
    private readonly ILogger<ListingController> _logger;

    public ListingController(ListingService listingService, ILogger<ListingController> logger)
    {
        _listingService = listingService;
        _logger = logger;
    }

    [HttpGet]
    [Route("Detail")]
    public IActionResult Detail([FromQuery] int listingId)
    {
        try
        {
            return new JsonResult(_listingService.GetListingDetails(listingId, (int)CurrentUserId));
        }
        catch (Exception e)
        {
            _logger.LogError("Unable to fetch car details for car with id " + listingId + ".\nError:\n" + e);
            return new JsonResult(new ListingModel());
        }
    }

    [HttpGet]
    [Route("Data")]
    public IActionResult Data()
    {
        try
        {
            return new JsonResult(_listingService.GetListingData());
        }
        catch (Exception e)
        {
            _logger.LogError("Unable to fetch car data.\nError:\n" + e);
            return new JsonResult(new ListingDataModel());
        }
    }

    [HttpGet]
    [Route("Edit")]
    public IActionResult Edit([FromQuery] int listingId)
    {
        try
        {
            return new JsonResult(_listingService.GetListingEditDetails(listingId));
        }
        catch (Exception e)
        {
            _logger.LogError("Unable to fetch listing details for listing with id " + listingId + ".\nError:\n" + e);
            return new JsonResult(new ListingEditModel());
        }
    }

    [HttpPost]
    [Route("Edit")]
    public IActionResult Edit([FromBody] ListingEditModel model)
    {
        try
        {
            if (model.ListingId != null && model.ListingId != 0)
            {
                _listingService.Edit(model);
            }
            else
            {
                _listingService.Add(model, (int)CurrentUserId);
            }

            return new JsonResult(true);
        }
        catch (Exception ex)
        {
            _logger.LogError("Error while adding the listing " + ex);
            return new JsonResult(false);
        }
    }

    [HttpPost]
    [Route("List")]
    public IActionResult List([FromBody] ListingQueryModel model)
    {
        try
        {
            return new JsonResult(_listingService.GetList(model, (int)CurrentUserId));
        }
        catch (Exception ex)
        {
            _logger.LogError("Error while fetching the listing list " + ex);
            return new JsonResult(false);
        }
    }

    [HttpGet]
    [Route("Own")]
    public IActionResult GetOwn()
    {
        try
        {
            return new JsonResult(_listingService.GetByUserId((int)CurrentUserId));
        }
        catch (Exception ex)
        {
            _logger.LogError("Error while fetching the listing list " + ex);
            return new JsonResult(false);
        }
    }

    [HttpPost]
    [Route("Delete")]
    public IActionResult Delete([FromQuery] int listingId)
    {
        try
        {
            _listingService.Delete(listingId);
            return new JsonResult(true);
        }
        catch (Exception ex)
        {
            _logger.LogError("Unable to delete listing with id " + listingId + ".\nError:\n" + ex);
            return new JsonResult(false);
        }
    }
}

