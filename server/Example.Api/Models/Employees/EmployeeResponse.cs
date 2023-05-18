using System.Text.Json.Serialization;

namespace Example.Api.Models.Employees
{
    public class EmployeeResponse
    {
        [JsonConstructor]
        public EmployeeResponse(Employee employee)
        {
            this.Employee = employee;
        }

        public Employee? Employee { get; set; }
    }
}