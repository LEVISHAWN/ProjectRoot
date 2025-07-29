using System.Threading.Tasks;

namespace ProjectRoot.Services
{
    public interface IAuthService
    {
        Task<string> CreateTenant(string tenantName);
        Task<string> CreateUser(string emailOrPhone, string password, string tenantId, string firstName, string lastName, string country);
        Task<string> GenerateJwtToken(string userId, string emailOrPhone, string tenantId);
    }
}
