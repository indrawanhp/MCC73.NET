using API.Models;
using Client.Base;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class EmployeesController : BaseController<Employee, EmployeeRepository, string>
{
    private readonly EmployeeRepository repository;
    public EmployeesController(EmployeeRepository repository) : base(repository)
    {
        this.repository = repository;
    }

    [HttpGet]
    public async Task<JsonResult> GetAll()
    {
        var result = await repository.Get();
        return Json(result);
    }

}
