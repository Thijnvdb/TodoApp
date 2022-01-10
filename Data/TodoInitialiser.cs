using todo.Models;

namespace todo.Data
{
    public static class DbInitializer
    {
        public static void Initialize(TodoContext context)
        {
            context.Database.EnsureCreated();

            // Look for any items.
            if (context.Items.Any())
            {
                return;   // DB has been seeded
            }
            
            var categories = new Category[]
            {
                new Category{Name = "Main"},
                new Category{Name = "Coding"}
            };
            foreach (Category c in categories)
            {
                context.Categories.Add(c);
            }
            context.SaveChanges();
            
            var items = new Item[]
            {
            new Item{MainText= "Do the dishes",Color= "80FF00", X=3, Y=5, Category = categories[0]},
            new Item{MainText= "Do laundry",Color= "80FF80", X=3, Y=3,Category = categories[0]},
            new Item{MainText= "Do stuff",Color= "80FF80", X=3, Y=3, Category = categories[0]},
            };
            foreach (Item s in items)
            {
                context.Items.Add(s);
            }
            context.SaveChanges();
        }
    }
}