using Microsoft.EntityFrameworkCore;
using todo.Models;

namespace todo.Data
{
    public class TodoContext : DbContext
    {
        public DbSet<Item> Items { get; set; }
        public DbSet<Category> Categories { get; set; }

        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().HasOne(a => a.Category);

            // modelBuilder.Entity<Item>().ToTable("Item");
            // modelBuilder.Entity<Category>().ToTable("Category");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }
    }
}