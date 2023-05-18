using Example.Api;
using Example.Api.Repositories.Employees;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Testcontainers.PostgreSql;
using System;

namespace Example.Tests
{
    public class TestStartup : WebApplicationFactory<Startup>, IAsyncLifetime
    {
        private readonly PostgreSqlContainer _container;

        public TestStartup()
        {
            _container = new PostgreSqlBuilder()
                .WithDatabase("items")
                .WithUsername("root")
                .WithPassword("password")
                .WithName("pg-test")
                .WithResourceMapping("../../../../../scripts/init_test.sql", "/docker-entrypoint-initdb.d/init_test.sql")
                .WithCleanUp(true)
                .Build();

        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureTestServices(services =>
            {

                services.RemoveDbContext<AppDbContext>();
                services.AddDbContext<AppDbContext>(options =>
                {
                    options.UseNpgsql(_container.GetConnectionString());
                });
                services.EnsureDbCreated<AppDbContext>();
                services.AddScoped<IEmployeesRepository, EmployeesRepository>();
            });
        }

        public async Task InitializeAsync() => await _container.StartAsync();

        public new async Task DisposeAsync() => await _container.DisposeAsync().AsTask();
    }

}