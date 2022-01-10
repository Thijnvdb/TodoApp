using Microsoft.AspNetCore.Mvc;
using todo.Data;
using todo.Models;

namespace todo.Controllers;

[ApiController]
[Route("categories")]
public class CategoryController : ControllerBase
{
    private readonly ILogger<CategoryController> _logger;
    private readonly TodoContext _db;

    public CategoryController(ILogger<CategoryController> logger, TodoContext db)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet()]
    public IActionResult Get()
    {
        return Ok(_db.Categories.ToList());
    }
    
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        return Ok(_db.Categories.Find(id));
    }
    
    [HttpGet("{id}/items")]
    public IActionResult GetItemsFromCategory(int id)
    {
        var items = from b in _db.Items where b.Category.ID == id select b;
        return Ok(items.ToList());
    }

    [HttpPost()]
    public IActionResult Create(Category category)
    {
        _db.Categories.Add(category);
        return Ok(_db.SaveChanges());
    }
    
    [HttpPost("{id}")]
    public IActionResult CreateItem(int id, Item item)
    {
        var category = _db.Categories.Find(id);
        if (category == null)
        {
            return StatusCode(404);
        }
        
        item.Category = category;
        _db.Items.Add(item);
        return Ok(_db.SaveChanges());
    }

    [HttpPut("{id}")]
    public IActionResult Edit(int id, [FromBody] Category category)
    {
        var toEdit = _db.Categories.Find(id);
        if (toEdit == null)
        {
            return StatusCode(404);
        }
        
        toEdit.Name = category.Name;
        return Ok(_db.SaveChanges());
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var toRemove = _db.Categories.Find(id);
        if (toRemove == null)
        {
            return StatusCode(404);
        }
        _db.Categories.Remove(toRemove);
        return Ok(_db.SaveChanges());
    }
}
