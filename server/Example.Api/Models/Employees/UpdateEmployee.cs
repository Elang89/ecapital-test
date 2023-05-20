using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

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
        [DefaultValue("John")]
        public string? FirstName { get; set; }

        [Column("last_name")]
        [DefaultValue("Starr")]
        public string? LastName { get; set; }


        [Column("salary", TypeName = "decimal(18,4)")]
        [Precision(18, 4)]
        [DefaultValue(20000)]
        public decimal Salary { get; set; }

        [Column("updated_at")]
        [JsonIgnore]
        public DateTimeOffset? UpdatedAt { get; set; }
    }
}