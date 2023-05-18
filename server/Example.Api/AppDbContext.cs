using Microsoft.EntityFrameworkCore;
using Example.Api.Models.Employees;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        this.Database.EnsureCreated();
    }

    public DbSet<Employee>? Employees { get; set; }

}