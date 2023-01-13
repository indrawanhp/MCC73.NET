using API.Models;
using Client.Base;
using Newtonsoft.Json;

namespace Client.Repositories.Data;

public class EmployeeRepository : GeneralRepository<Employee, string>
{
    private readonly Address address;
    private readonly HttpClient httpClient;
    private readonly string request;
    private readonly IHttpContextAccessor _contextAccessor;
    public EmployeeRepository(Address address, string request = "Employees/") : base(address, request)
    {
        this.address = address;
        this.request = request;
        _contextAccessor = new HttpContextAccessor();
        httpClient = new HttpClient
        {
            BaseAddress = new Uri(address.link)
        };
    }
}
