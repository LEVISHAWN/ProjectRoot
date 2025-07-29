using System;

namespace ProjectRoot.Services;

public interface IAuthService
{
    Task<string> CreateTenant(string tenantName);
    Task<string> CreateUser(string emailOrPhone, string password, string tenantId, string firstName, string lastName, string country);
    string GenerateJwtToken(string userId, string emailOrPhone, string tenantId);
}

public class MockAuthService : IAuthService
{
    public Task<string> CreateTenant(string tenantName) => Task.FromResult(Guid.NewGuid().ToString());
    public Task<string> CreateUser(string emailOrPhone, string password, string tenantId, string firstName, string lastName, string country)
        => Task.FromResult(Guid.NewGuid().ToString());
    public string GenerateJwtToken(string userId, string emailOrPhone, string tenantId) => "mock-jwt-token";
}