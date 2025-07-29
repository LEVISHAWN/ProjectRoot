using Microsoft.AspNetCore.Mvc;
using ProjectRoot.Models;
using ProjectRoot.Services;
using Microsoft.AspNetCore.Http;

namespace ProjectRoot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpGet("status")]
        public IActionResult CheckAuthStatus()
        {
            bool isAuthenticated = User?.Identity?.IsAuthenticated ?? false;
            return Ok(new { isAuthenticated });
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Invalid input." });

            try
            {
                var tenantId = await _authService.CreateTenant(model.TenantName); // ✅ FIXED with await

                var userId = await _authService.CreateUser(
                    model.EmailOrPhone,
                    model.Password,
                    tenantId,
                    model.FirstName,
                    model.LastName,
                    model.Country
                );

                var token = await _authService.GenerateJwtToken(userId, model.EmailOrPhone, tenantId);

                Response.Cookies.Append("jwt", token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict
                });

                return Ok(new { message = "Sign up successful." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
