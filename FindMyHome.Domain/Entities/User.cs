﻿using System.ComponentModel.DataAnnotations;

namespace FindMyHome.Domain.Entities;

public class User
{
    [Key]
    public int UserId { get; set; }
    [Required]
    public int UserRoleId { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string PasswordHash { get; set; }
    [Required]
    public string Salt { get; set; }
    public string? DeviceToken { get; set; }
    [Required]
    public DateTime CreatedOn { get; set; }
    [Required]
    public DateTime UpdatedOn { get; set; }

    public virtual UserRole UserRole { get; set; }
}
