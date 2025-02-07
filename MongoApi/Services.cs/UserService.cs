using MongoDB.Driver;
using MongoApi.Models;
using Microsoft.Extensions.Options;

namespace MongoApi.Services;

public class UserService
{
    private readonly IMongoCollection<User> _users;

    public UserService(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDbSettings:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDbSettings:DatabaseName"]);
        _users = database.GetCollection<User>(config["MongoDbSettings:CollectionName"]);
    }
    
    public async Task<List<User>> GetAllAsync() => await _users.Find(user => true).ToListAsync();

    public async Task<User?> GetByIdAsync(string id) => await _users.Find(user => user.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(User user) => await _users.InsertOneAsync(user);
}