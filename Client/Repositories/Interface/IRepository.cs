using System.Net;

namespace Client.Repositories.Interface;

public interface IRepository<Entity, TId>
    where Entity : class
{
    Task<List<Entity>> Get();
    Task<Entity> Get(TId id);
    HttpStatusCode Post(Entity entity);
    HttpStatusCode Put(Entity entity);
    HttpStatusCode Delete(TId id);

}
