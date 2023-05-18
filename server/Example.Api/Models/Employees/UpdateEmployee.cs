using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Example.Api.Models.Employees
{
    public class UpdateEmployee
    {
        [JsonConstructor]
        public UpdateEmployee(string firstName, string lastName, decimal salary)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Salary = salary;
            this.UpdatedAt = DateTimeOffset.UtcNow;
        }

        [Column("first_name")]
        public string? FirstName { get; set; }
        [Column("last_name")]
        public string? LastName { get; set; }
        [Column("salary")]
        public decimal Salary { get; set; }
        [Column("updated_at")]
        [JsonIgnore]
        public DateTimeOffset? UpdatedAt { get; set; }
    }
}