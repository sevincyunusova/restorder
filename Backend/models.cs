using System;

namespace Backend
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    public class Reservation : BaseEntity
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string ReservationDate { get; set; } = string.Empty;
        public string ReservationTime { get; set; } = string.Empty;
        public int SeatsCount { get; set; }
        public string Note { get; set; } = string.Empty;
    }
}