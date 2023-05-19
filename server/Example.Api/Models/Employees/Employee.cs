using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public Guid Id { get; set; }

        [Required]
        [Column("first_name")]
        public string? FirstName { get; set; }

        [Required]
        [Column("last_name")]
        public string? LastName { get; set; }

        [Required]
        [Column("salary")]
        public decimal Salary { get; set; }

        [Column("created_at")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public DateTimeOffset? CreatedAt { get; set; }

        [Column("updated_at")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public DateTimeOffset? UpdatedAt { get; set; }
    }
}