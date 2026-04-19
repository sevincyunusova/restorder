document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.card');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const filterValue = button.getAttribute('data-filter');
            menuCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block'; 
                } else {
                    card.style.display = 'none';  
                }
            });
        });
    });
});