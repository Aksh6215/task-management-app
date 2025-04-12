using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TaskItem>()
                .Property(t => t.Title)
                .IsRequired();

            modelBuilder.Entity<TaskItem>()
                .Property(t => t.Description)
                .IsRequired(false);

            modelBuilder.Entity<TaskItem>()
                .Property(t => t.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<TaskItem>()
                .Property(t => t.Status)
                .HasDefaultValue(0);

            modelBuilder.Entity<TaskItem>()
                .Property(t => t.Priority)
                .HasDefaultValue(1);
        }
    }
}
