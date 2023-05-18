using Example.Api.Models.Employees;

namespace Example.Api.Repositories.Employees
{
    public interface IEmployeesRepository
    {
        Task<IEnumerable<Employee>> GetEmployees();

        Task<Employee> GetEmployeeById(Guid id);

        Task<Employee> CreateEmployee(Employee employee);

        Task<Employee> UpdateEmployee(Employee employee);

        Task DeleteEmployee(Employee employee);
    }
}