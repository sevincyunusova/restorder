document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MENU FILTER  ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.card');
    
    if (filterButtons.length > 0) {
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
    }

    // ---  CAROUSEL  ---
    const carousel = document.getElementById('carousel');
    if (carousel) {
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
    }

    // --- 3. RESERVATION  ---
    const modal = document.getElementById('reservationModal');
    const openBtns = document.querySelectorAll('.openModalBtn'); 
    const closeBtn = document.getElementById('closeModal');

    if (modal && openBtns.length > 0) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); 
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModalFunc = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModalFunc);
        }
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }
});