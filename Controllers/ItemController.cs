using Microsoft.AspNetCore.Mvc;
using todo.Data;
using todo.Models;

namespace todo.Controllers;

[ApiController]
[Route("items")]
public class ItemController : ControllerBase
{
    private readonly ILogger<ItemController> _logger;
    private readonly TodoContext _db;

    public ItemController(ILogger<ItemController> logger, TodoContext db)
    {
        _db = db;
        _logger = logger;
    }
    
    [HttpGet()]
    public List<Item> GetAll()
    {
        return _db.Items.ToList();
    }

    [HttpGet(Name= "open")]
    public IActionResult GetOpen()
    {
        var items = from b in _db.Items
                    where !b.IsDone select b;
        return Ok(items.ToList());
    }

    [HttpGet(Name = "{id}")]
    public IActionResult Get(int id)
    {
        return Ok(_db.Items.Find(id));
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var toRemove = _db.Items.Find(id);
        if (toRemove == null)
            return StatusCode(404);
        _db.Items.Remove(toRemove);
        return Ok(_db.SaveChanges());
    }
    
    
    [HttpDelete()]
    public IActionResult BulkDelete([FromQuery]int[] ids)
    {
        var q = from i in _db.Items
            where ids.Contains(i.ID)
            select i;
        List<Item> items = q.ToList();
        _db.Items.RemoveRange(items);
        return Ok(_db.SaveChanges());
    }

    [HttpPut("{id}/done")]
    public IActionResult ChangeDone(int id, [FromQuery] bool value)
    {
        var item = _db.Items.Find(id);
        if (item == null)
            return StatusCode(404);
        item.IsDone = value;
        return Ok(_db.SaveChanges());
    }

    [HttpPut("{id}/position")]
    public IActionResult ChangePosition(int id, [FromBody] Item input)
    {
        var item = _db.Items.Find(id);
        if (item == null)
            return StatusCode(404);
        //_logger.LogDebug($"item: {input.X}, {input.Y}");
        item.X = input.X;
        item.Y = input.Y;
        return Ok(_db.SaveChanges());
    }
    
    [HttpPut("{id}/text")]
    public IActionResult ChangePosition(int id, [FromQuery] string value)
    {
        var item = _db.Items.Find(id);
        if (item == null)
            return StatusCode(404);
        item.MainText = value;
        return Ok(_db.SaveChanges());
    }
}
