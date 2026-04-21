using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Reservations
        // Bu metod bazadakı bütün rezervasiyaları siyahı halında qaytarır
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            return await _context.Reservations.ToListAsync();
        }

        // POST: api/Reservations
        // Bu metod Frontend-dən gələn yeni rezervasiyanı bazaya yazır
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            if (reservation == null)
            {
                return BadRequest("Məlumat boş ola bilməz.");
            }

            try
            {
                _context.Reservations.Add(reservation);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Rezervasiya uğurla tamamlandı!", data = reservation });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Daxili server xətası: {ex.Message}");
            }
        }
    }
}