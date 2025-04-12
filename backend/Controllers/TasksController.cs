using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskDbContext _context;

        public TasksController(TaskDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            return task;
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> Create(TaskItem task)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (string.IsNullOrWhiteSpace(task.Title))
                {
                    return BadRequest(new { message = "Title is required" });
                }

                // Initialize required fields
                task.CreatedAt = DateTime.UtcNow;
                if (task.DueDate == default)
                {
                    task.DueDate = DateTime.UtcNow.AddDays(1);
                }
                
                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();
                
                return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the task", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TaskItem task)
        {
            if (id != task.Id)
                return BadRequest(new { message = "Task ID mismatch" });

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Entry(task).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Tasks.AnyAsync(t => t.Id == id))
                {
                    return NotFound(new { message = "Task not found" });
                }
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound(new { message = "Task not found" });

            try
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while deleting the task", error = ex.Message });
            }
        }
    }
}
