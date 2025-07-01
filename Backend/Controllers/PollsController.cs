using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("polls")]
    public class PollsController : ControllerBase
    {
        private readonly PollService _pollService;

        public PollsController(PollService pollService)
        {
            _pollService = pollService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Poll>>> Get()
        {
            var polls = await _pollService.GetPollsAsync();
            if (polls.Count == 0)
                return BadRequest("No poll data found.");
            return Ok(polls);
        }
    }
}
