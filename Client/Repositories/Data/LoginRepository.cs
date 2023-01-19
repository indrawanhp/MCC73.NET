using API.Models;
using API.ViewModels;
using Client.Base;
using Client.Models;
using Newtonsoft.Json;
using System.Text;

namespace Client.Repositories.Data;

public class LoginRepository : GeneralRepository<Account, int>
{
    private readonly Address address;
    private readonly HttpClient httpClient;
    private readonly string request;
    private readonly IHttpContextAccessor _contextAccessor;
    public LoginRepository(Address address, string request = "Accounts/") : base(address, request)
    {
        this.address = address;
        this.request = request;
        _contextAccessor = new HttpContextAccessor();
        httpClient = new HttpClient
        {
            BaseAddress = new Uri(address.link)
        };
    }

    public async Task<JWTokenVM> Auth(LoginVM login)
    {
        JWTokenVM token = null;

        StringContent content = new StringContent(JsonConvert.SerializeObject(login), Encoding.UTF8, "application/json");
        var result = await httpClient.PostAsync(request + "Login/", content);

        string apiResponse = await result.Content.ReadAsStringAsync();
        token = JsonConvert.DeserializeObject<JWTokenVM>(apiResponse);

        return token;
    }
}
