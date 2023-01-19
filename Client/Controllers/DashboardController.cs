using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

[Authorize]
public class DashboardController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [Authorize(Roles = "Manager")]
    public IActionResult Employees()
    {
        return View();
    }

}
