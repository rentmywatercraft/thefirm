using System;
using System.ComponentModel.DataAnnotations;

namespace TheFirm.Models
{
    public class JobTitle
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
    }
}
