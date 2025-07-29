// Assuming this is your model for signup, no changes needed unless you want validation attributes example:

using System.ComponentModel.DataAnnotations;

public class SignUpModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    // Add other properties and validation attributes as per your existing model
}