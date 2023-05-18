using System.Net;
using System.Net.Http.Json;
using Example.Api.Models.Employees;
using FluentAssertions;
using Example.Api.Repositories.Employees;
using Microsoft.Extensions.DependencyInjection;

namespace Example.Tests;

public class EmployeesControllerTest : IClassFixture<TestStartup>
{
    private readonly TestStartup _startup;
    private readonly Random _rand;

    public EmployeesControllerTest(TestStartup startup)
    {
        _startup = startup;
        _rand = new();
    }

    [Fact]
    public async Task Create_Employee_200_Ok()
    {
        using var client = _startup.CreateClient();

        var employee = new Employee("William", "Howard", 89000);
        var employeeRequest = new EmployeeRequest(employee);

        using var response = await client.PostAsJsonAsync("api/v1/employees", employeeRequest);

        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Create_Employee_400_BadRequest()
    {
        using var client = _startup.CreateClient();

        var employee = new Dictionary<string, object>
        {
            {"Name","Employee"},
            {"BadField", "Something"},
            {"Description", "This is desc"},
            {"Price", 20}
        };

        using var response = await client.PostAsJsonAsync("api/v1/employees", employee);

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task Get_Employee_By_Id_200_Ok()
    {
        using var client = _startup.CreateClient();

        using (var scope = _startup.Services.CreateScope())
        {
            var employee = CreateRandomEmployee();
            var repository = scope.ServiceProvider.GetRequiredService<IEmployeesRepository>();
            await repository.CreateEmployee(employee);

            var response = await client.GetAsync($"api/v1/employees/{employee.Id}");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }

    [Fact]
    public async Task Get_Employee_By_Id_404_NotFound()
    {
        using var client = _startup.CreateClient();
        var id = new Guid();

        var response = await client.GetAsync($"api/v1/employees/{id}");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    }

    [Fact]
    public async Task Update_Employee_200_Ok()
    {
        using var client = _startup.CreateClient();
        using (var scope = _startup.Services.CreateScope())
        {
            var employee = CreateRandomEmployee();
            var repository = scope.ServiceProvider.GetRequiredService<IEmployeesRepository>();
            await repository.CreateEmployee(employee);

            var updateEmployee = new UpdateEmployee(employee.FirstName, "New Last Name", employee.Salary);
            var updateRequest = new UpdateEmployeeRequest(updateEmployee);

            var response = await client.PatchAsJsonAsync($"api/v1/employees/{employee.Id}", updateRequest);

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }


    }

    [Fact]
    public async Task Update_Employee_404_NotFound()
    {
        using var client = _startup.CreateClient();
        Employee employee = CreateRandomEmployee();

        using (var scope = _startup.Services.CreateScope())
        {
            var repository = scope.ServiceProvider.GetRequiredService<IEmployeesRepository>();
            await repository.CreateEmployee(employee);
            var updateEmployee = new UpdateEmployee(employee.FirstName, "New Last Name", employee.Salary);
            var updateRequest = new UpdateEmployeeRequest(updateEmployee);
            using var response = await client.PatchAsJsonAsync($"api/v1/employees/{new Guid()}", updateRequest);

            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }
    }

    [Fact]
    public async Task Update_Employee_400_BadRequest()
    {
        using var client = _startup.CreateClient();

        Employee employee = CreateRandomEmployee();

        var badEmployee = new Dictionary<string, object>
        {
            {"Name","Employee"},
            {"BadField", "Something"},
            {"Description", "This is desc"},
            {"Price", 20}
        };


        using (var scope = _startup.Services.CreateScope())
        {
            var repository = scope.ServiceProvider.GetRequiredService<IEmployeesRepository>();
            await repository.CreateEmployee(employee);
            using var response = await client.PatchAsJsonAsync($"api/v1/employees/{employee.Id}", employee);

            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }
    }

    [Fact]
    public async Task Delete_Employee_204_NoContent()
    {
        using var client = _startup.CreateClient();
        Employee employee = CreateRandomEmployee();

        using (var scope = _startup.Services.CreateScope())
        {
            var repository = scope.ServiceProvider.GetRequiredService<IEmployeesRepository>();
            await repository.CreateEmployee(employee);
            using var response = await client.DeleteAsync($"api/v1/employees/{employee.Id}");

            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }
    }

    [Fact]
    public async Task Delete_Employee_404_NotFound()
    {
        using var client = _startup.CreateClient();

        using var response = await client.DeleteAsync($"api/v1/employees/{new Guid()}");
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Get_All_Full_200_Ok()
    {
        using var client = _startup.CreateClient();

        using var response = await client.GetAsync("api/v1/employees");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }


    private Employee CreateRandomEmployee()
    {
        return new Employee(Guid.NewGuid(), Faker.Name.First(), Faker.Name.Last(), _rand.Next(1000), DateTimeOffset.UtcNow, DateTimeOffset.UtcNow);
    }
}