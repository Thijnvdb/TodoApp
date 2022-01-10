using System.ComponentModel.DataAnnotations;

namespace todo.Models
{
    public class Item
    {
        public int ID {get; set;}
        [StringLength(42, MinimumLength = 4)]
        public string? MainText {get; set;}
        public string? Color {get; set;}
        public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
        public DateTime UpdatedAt {get; set;} = DateTime.UtcNow;
        public bool IsDone {get; set;} = false;
        [Range(0,10)]
        public int X {get; set;} = 0;
        [Range(0,10)]
        public int Y {get; set;} = 0;
        public virtual Category? Category {get; set;}
    }
}