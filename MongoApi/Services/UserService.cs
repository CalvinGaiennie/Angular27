using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MongoApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IConfiguration config)
        {
            var client = new MongoClient(config["MongoDbSettings:ConnectionString"]);
            var database = client.GetDatabase(config["MongoDbSettings:DatabaseName"]);
            _users = database.GetCollection<User>(config["MongoDbSettings:CollectionName"]);
        }

        // ✅ Get all users
        public async Task<List<User>> GetAllAsync() =>
            await _users.Find(user => true).ToListAsync();

        // ✅ Get a user by ID
        public async Task<User?> GetByIdAsync(string id) =>
            await _users.Find(user => user.Id == id).FirstOrDefaultAsync();

        // ✅ Create a new user
        public async Task CreateAsync(User user) =>
            await _users.InsertOneAsync(user);

        // ✅ Update a user
        public async Task UpdateAsync(string id, User updatedUser) =>
            await _users.ReplaceOneAsync(user => user.Id == id, updatedUser);

        // ✅ Delete a user
        public async Task DeleteAsync(string id) =>
            await _users.DeleteOneAsync(user => user.Id == id);
    }
}
