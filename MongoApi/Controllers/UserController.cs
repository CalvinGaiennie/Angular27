using Microsoft.AspNetCore.Mvc;
using MongoApi.Models;
using MongoApi.Services;

namespace MongoApi.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase{
    private readonly UserService _userService;

    public UserController(UserService userService) => _userService = userService;


    [HttpGet]
    public async Task<ActionResult<List<User>>> GetAllUsers() => await _userService.GetAllAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserById(string id)
    {
        var user = await _userService.GetByIdAsync(id);
        return user is not null ? Ok(user) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(User user)
    {
        await _userService.CreateAsync(user);
        return CreatedAtAction(nameof(GetUserById), new { id= user.Id}, user);

    }
}