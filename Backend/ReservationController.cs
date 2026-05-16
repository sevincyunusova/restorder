using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Backend
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Reservation data)
        {
            if (data == null)
            {
                return BadRequest("Məlumatlar boşdur!");
            }

            _context.Reservations.Add(data);
            _context.SaveChanges();

            return Ok(new { message = "Rezervasiyanız uğurla tamamlandı!" });
        }

        [HttpGet]
        public ActionResult<IEnumerable<Reservation>> GetAll()
        {
            var list = _context.Reservations.ToList();
            return Ok(list);
        }
    }
}