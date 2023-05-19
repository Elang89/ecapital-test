using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Example.Api.Models.Employees
{
    public class EmployeeListResponse
    {
        [JsonConstructor]
        public EmployeeListResponse(IEnumerable<Employee> employees)
        {
            this.Employees = employees;
        }

        [Required]
        public IEnumerable<Employee>? Employees { get; set; }
    }
}
