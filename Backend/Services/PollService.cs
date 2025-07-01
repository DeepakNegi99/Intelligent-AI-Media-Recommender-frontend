
using Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class PollService
    {
        private readonly IMongoCollection<Poll> _pollsCollection;

        public PollService(IOptions<MongoDBSettings> mongoSettings)
        {
            var mongoClient = new MongoClient(mongoSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoSettings.Value.DatabaseName);
            _pollsCollection = mongoDatabase.GetCollection<Poll>("Polls");
        }

        public async Task<List<Poll>> GetPollsAsync() =>
            await _pollsCollection.Find(_ => true).ToListAsync();
    }
}
