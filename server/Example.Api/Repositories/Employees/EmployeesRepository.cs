using Example.Api.Models.Employees;
using Microsoft.EntityFrameworkCore;

namespace Example.Api.Repositories.Employees
{
    public class EmployeesRepository : IEmployeesRepository
    {
        private readonly AppDbContext _context;

        public EmployeesRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Employee> CreateEmployee(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();

            var result = await GetEmployeeById(employee.Id);

            return result;
        }

        public async Task DeleteEmployee(Employee employee)
        {
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<Employee> GetEmployeeById(Guid id) =>
            await _context.Employees.AsNoTracking().Where(e => e.Id.Equals(id)).FirstOrDefaultAsync();

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            var employees = _context.Employees.AsQueryable();

            return await employees.Take(50).ToListAsync();
        }

        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();

            var result = await GetEmployeeById(employee.Id);

            return result;
        }
    }
}