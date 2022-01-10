using System.ComponentModel.DataAnnotations;

namespace todo.Models
{
    public class Category
    {
        public int ID {get; set;}
        [StringLength(28,MinimumLength = 3)]
        public string? Name {get; set;}
    }
}