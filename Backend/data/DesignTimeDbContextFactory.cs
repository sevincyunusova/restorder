using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Backend.Data;

namespace Backend.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            
            // SQLite bazası üçün fayl adı: HeavenPalate.db
            optionsBuilder.UseSqlite("Data Source=HeavenPalate.db");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}