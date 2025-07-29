// Interface for AuthService, no changes unless required

public interface IAuthService
{
    // Define your authentication method signatures here
    bool ValidateUser(string email, string password);
    void RegisterUser(SignUpModel model);
}