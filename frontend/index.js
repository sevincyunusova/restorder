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

const carousel = document.getElementById('carousel');
const cards = [...carousel.children];
cards.forEach(card => {
    const clone = card.cloneNode(true);
    carousel.appendChild(clone);
});

function autoScroll() {
    const cardWidth = carousel.firstElementChild.offsetWidth + 20; 

    if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollTo({ left: 0, behavior: 'instant' });
        
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
}

let scrollInterval = setInterval(autoScroll, 2000);
carousel.addEventListener('mouseenter', () => clearInterval(scrollInterval));
carousel.addEventListener('mouseleave', () => scrollInterval = setInterval(autoScroll, 2000));