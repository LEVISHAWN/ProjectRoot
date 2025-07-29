using System.ComponentModel.DataAnnotations;

namespace ProjectRoot.Models;

public class SignUpModel
{
    [Required]
    public string EmailOrPhone { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string TenantName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Country { get; set; }
    [Required]
    public bool AgreeTerms { get; set; }
}