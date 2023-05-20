using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Example.Api.Models.Employees
{
    [Table("employees")]
    public class Employee
    {

        public Employee(Guid id, string firstName, string lastName, decimal salary, DateTimeOffset createdAt, DateTimeOffset updatedAt)
        {
            this.Id = id;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Salary = salary;
            this.CreatedAt = createdAt;
            this.UpdatedAt = updatedAt;
        }

        [JsonConstructor]
        public Employee(string firstName, string lastName, decimal salary)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Salary = Salary;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; }

        [Required]
        [DefaultValue("John")]
        [Column("first_name")]
        public string? FirstName { get; set; }

        [Required]
        [DefaultValue("Waters")]
        [Column("last_name")]
        public string? LastName { get; set; }

        [Required]
        [DefaultValue("50000")]
        [Precision(18, 4)]
        [Column("salary", TypeName = "decimal(18,4)")]
        public decimal Salary { get; set; }

        [Column("created_at")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTimeOffset? CreatedAt { get; set; }

        [Column("updated_at")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTimeOffset? UpdatedAt { get; set; }
    }
}