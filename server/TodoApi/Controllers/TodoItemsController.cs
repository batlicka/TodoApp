using System;
using System.Collections.Generic;
using System.Data.Odbc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoItemsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/TodoItems/id        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        // POST: api/TodoItems        
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(PostTodoItem), new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();
            await _context.TodoItems.AsNoTracking().FirstOrDefaultAsync();
            return NoContent();
        }

        //get all completed
        [HttpGet]
        [Route("get-all-completed-todos")]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetCompletedTodoItems()
        {            
            var todos = await _context.TodoItems.Where(x => x.IsComplete == true).ToListAsync();
            return Ok(todos);
        }

        [HttpGet]
        [Route("get-all-uncompleted-todos")]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetUnCompletedTodoItems()
        {            
            var todos = await _context.TodoItems.Where(x => x.IsComplete == false).ToListAsync();
            return Ok(todos);
        }

        [HttpPut]
        [Route("undo-completed-todo/{id}")]
        public async Task<IActionResult> UndoCompletedTodo([FromRoute] long id, TodoItem undoDeletedTodoRequest) 
        {
            var todo = await _context.TodoItems.FindAsync(id);

            if (todo == null) {
                return NotFound();
            }

            todo.IsComplete = false;
            await _context.SaveChangesAsync();

            return Ok(todo);
        }

        private bool TodoItemExists(long id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }
    }
}
