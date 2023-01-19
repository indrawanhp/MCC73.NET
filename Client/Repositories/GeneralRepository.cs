using Client.Base;
using Client.Repositories.Interface;
using Newtonsoft.Json;
using System.Net;
using System.Text;

namespace Client.Repositories;

public class GeneralRepository<Entity, TId> : IRepository<Entity, TId>
    where Entity : class
{
    private readonly Address address;
    private readonly string request;
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly HttpClient httpClient;

    public GeneralRepository(Address address, string request)
    {
        this.address = address;
        this.request = request;
        _contextAccessor = new HttpContextAccessor();
        this.httpClient = new HttpClient
        {
            BaseAddress = new Uri(address.link)
        };
    }
    public HttpStatusCode Delete(TId id)
    {
        var result = httpClient.DeleteAsync(request + id).Result;
        return result.StatusCode;
    }

    public async Task<List<Entity>> Get()
    {
        List<Entity> entities = new List<Entity>();
        using (var response = await httpClient.GetAsync(request))
        {
            string apiResponse = await response.Content.ReadAsStringAsync();
            entities = JsonConvert.DeserializeObject<List<Entity>>(apiResponse);
        }
        return entities;
    }

    public async Task<Entity> Get(TId id)
    {
        Entity entity = null;

        using (var response = await httpClient.GetAsync(request + id))
        {
            string apiResponse = await response.Content.ReadAsStringAsync();
            entity = JsonConvert.DeserializeObject<Entity>(apiResponse);
        }
        return entity;
    }
    //public Entity Get(TId id)
    //{
    //    var result = httpClient.GetAsync(request + id).Result;
    //    if (result.IsSuccessStatusCode)
    //    {
    //        string Response = result.Content.ReadAsStringAsync().Result;
    //        var data = JsonConvert.DeserializeObject<Entity>(Response);
    //        return data;

    //    }
    //    return null;
    //}

    public HttpStatusCode Post(Entity entity)
    {
        StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
        var result = httpClient.PostAsync(address.link + request, content).Result;
        return result.StatusCode;
    }

    public HttpStatusCode Put(Entity entity)
    {
        StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
        var result = httpClient.PutAsync(address.link + request, content).Result;
        return result.StatusCode;
    }
}
