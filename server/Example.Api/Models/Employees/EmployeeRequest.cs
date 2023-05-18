using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Example.Api.Models.Employees
{
    public class EmployeeRequest
    {
        [JsonConstructor]
        public EmployeeRequest(Employee employee)
        {
            this.Employee = employee;
        }


        [Required]
        public Employee? Employee { get; set; }
    }
}