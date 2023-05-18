using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using Example.Api.Models.Employees;
using Example.Api.Repositories.Employees;

namespace Example.Api.Controllers
{
    [ApiController]
    [Route("employees")]
    public class EmployeesController : ControllerBase
    {
        private readonly ILogger<EmployeesController> _logger;
        private readonly IEmployeesRepository _employeesRepository;

        public EmployeesController(ILogger<EmployeesController> logger, IEmployeesRepository employeesRepository)
        {
            _logger = logger;
            _employeesRepository = employeesRepository;
        }

        [HttpGet]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmployeeListResponse))]
        public async Task<EmployeeListResponse> GetEmployees()
        {
            var employees = await _employeesRepository.GetEmployees();

            return new EmployeeListResponse(employees);
        }

        [HttpGet("{id}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmployeeResponse))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EmployeeResponse>> GetById(Guid id)
        {
            var employee = await _employeesRepository.GetEmployeeById(id);

            if (employee is null)
            {
                var message = $"Employee with id = {id} not found";
                return NotFound(message);
            }

            return Ok(new EmployeeResponse(employee));
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmployeeResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<EmployeeResponse>> CreateItem([FromBody] EmployeeRequest employeeRequest)
        {
            var employee = employeeRequest.Employee;
            Employee result = await _employeesRepository.CreateEmployee(employee);

            var response = new EmployeeResponse(result);

            return Ok(response);
        }

        [HttpPatch("{id}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<ActionResult<EmployeeResponse>> UpdateEmployee(Guid id, [FromBody] UpdateEmployeeRequest updateEmployeeRequest)
        {
            var updateEmployee = updateEmployeeRequest.Employee;
            var existingEmployee = await _employeesRepository.GetEmployeeById(id);
            var employeeResult = existingEmployee;

            if (employeeResult is null)
            {
                return NotFound();
            }

            Employee employeeToUpdate = new Employee(
                employeeResult.Id,
                updateEmployee.FirstName,
                updateEmployee.LastName,
                updateEmployee.Salary,
                employeeResult.CreatedAt.Value,
                updateEmployee.UpdatedAt.Value
            );

            var result = await _employeesRepository.UpdateEmployee(employeeToUpdate);
            var response = new EmployeeResponse(result);

            return Ok(response);
        }

        [HttpDelete("{id}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteItem(Guid id)
        {
            var existingEmployee = await _employeesRepository.GetEmployeeById(id);

            if (existingEmployee is null)
            {
                return NotFound();
            }

            Employee employeeToDelete = new Employee(
                existingEmployee.Id,
                existingEmployee.FirstName,
                existingEmployee.LastName,
                existingEmployee.Salary,
                existingEmployee.CreatedAt.Value,
                existingEmployee.UpdatedAt.Value
            );

            await _employeesRepository.DeleteEmployee(employeeToDelete);

            return NoContent();
        }

    }
}