using System.Threading.Tasks;

namespace ProjectRoot.Services
{
    public class MockAuthService : IAuthService
    {
        // Sync version (optional – not used in controller)
        public string CreateUser(string emailOrPhone, string password, string firstName, string lastName, string country)
        {
            return "mock-user-id";
        }

        // Async version with tenant
        public Task<string> CreateUser(string emailOrPhone, string password, string tenantId, string firstName, string lastName, string country)
        {
            return Task.FromResult("mock-user-id");
        }

        // Async tenant creation (newly added)
        public Task<string> CreateTenant(string tenantName)
        {
            return Task.FromResult("mock-tenant-id");
        }

        // Async JWT generator
        public Task<string> GenerateJwtToken(string userId, string emailOrPhone, string tenantId)
        {
            return Task.FromResult("mock-jwt-token");
        }
    }
}
