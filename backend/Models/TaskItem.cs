using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class TaskItem
    {
        public TaskItem()
        {
            Title = string.Empty;
            CreatedAt = DateTime.UtcNow;
            DueDate = DateTime.UtcNow.AddDays(1); // Set default due date to tomorrow
            Status = 0; // Not Started
            Priority = 0; // Low
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, ErrorMessage = "Title cannot be longer than 100 characters")]
        [MinLength(1, ErrorMessage = "Title cannot be empty")]
        public string Title { get; set; }

        [StringLength(500, ErrorMessage = "Description cannot be longer than 500 characters")]
        public string? Description { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; }

        [Range(0, 2, ErrorMessage = "Status must be between 0 and 2")]
        public int Status { get; set; }

        [Range(0, 2, ErrorMessage = "Priority must be between 0 and 2")]
        public int Priority { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? CompletedAt { get; set; }
    }
}
