using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Example.Api.Models.Employees
{
    public class UpdateEmployeeRequest
    {
        [JsonConstructor]
        public UpdateEmployeeRequest(UpdateEmployee employee)
        {
            this.Employee = employee;
        }

        [Required]
        public UpdateEmployee? Employee { get; set; }
    }
}