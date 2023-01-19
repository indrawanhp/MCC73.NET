using API.Models;
using Azure;
using Client.Base;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace Client.Controllers;

public class EmployeesController : BaseController<Employee, EmployeeRepository, string>
{
    private readonly EmployeeRepository repository;
    public EmployeesController(EmployeeRepository repository) : base(repository)
    {
        this.repository = repository;
    }
}
