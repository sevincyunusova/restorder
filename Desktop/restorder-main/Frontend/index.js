document.addEventListener('DOMContentLoaded', () => {
    const foodModal = document.getElementById('foodModal');
    const closeFoodBtn = document.getElementById('closeFoodModal');
    const resModal = document.getElementById('reservationModal');
    const openResBtns = document.querySelectorAll('.openModalBtn');
    const closeResBtn = document.getElementById('closeModal');
    const foodCards = document.querySelectorAll('.card[data-name]');

    if (foodCards.length > 0) {
        foodCards.forEach(card => {
            card.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const ingredients = this.getAttribute('data-ingredients');
                const price = this.getAttribute('data-price');
                const img = this.querySelector('img').src;

                document.getElementById('modalFoodName').innerText = name;
                document.getElementById('modalFoodIngredients').innerText = ingredients;
                document.getElementById('modalFoodPrice').innerText = price;
                document.getElementById('modalFoodImg').src = img;

                if (foodModal) {
                    foodModal.classList.remove('hidden');
                    foodModal.classList.add('flex');
                }
                document.body.style.overflow = 'hidden';
            });
        });
    }

    if (closeFoodBtn) {
        closeFoodBtn.addEventListener('click', () => {
            if (foodModal) {
                foodModal.classList.add('hidden');
                foodModal.classList.remove('flex');
            }
            document.body.style.overflow = 'auto';
        });
    }

    if (foodModal) {
        foodModal.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' && e.target.innerText.includes('Sifariş Et')) {
                const foodName = document.getElementById('modalFoodName').innerText;
                
                alert(foodName + " seçildi! Zəhmət olmasa rezervasiyanı tamamlayın.");

                foodModal.classList.add('hidden');
                foodModal.classList.remove('flex');
                
                if (resModal) {
                    resModal.classList.remove('hidden');
                    resModal.classList.add('flex');
                    const messageArea = resModal.querySelector('textarea[name="message"]') || resModal.querySelector('textarea[name="note"]');
                    if (messageArea) {
                        messageArea.value = `Mən "${foodName}" sifariş etmək istəyirəm. `;
                    }
                }
            }
        });
    }

    if (openResBtns.length > 0) {
        openResBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (resModal) {
                    resModal.classList.remove('hidden');
                    resModal.classList.add('flex');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    if (closeResBtn) {
        closeResBtn.addEventListener('click', () => {
            if (resModal) {
                resModal.classList.add('hidden');
                resModal.classList.remove('flex');
            }
            document.body.style.overflow = 'auto';
        });
    }

    const handleFormSubmit = async (formElement) => {
        const formData = new FormData(formElement);
        
        const reservationData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phoneNumber')?.toString() || formData.get('phone')?.toString() || "", 
            reservationDate: formData.get('reservationDate'),
            reservationTime: formData.get('reservationTime'),
            seatsCount: parseInt(formData.get('seatsCount')) || 1,
            note: formData.get('message') || formData.get('note') || ""
        };

        try {
            const response = await fetch('http://localhost:5126/api/Reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservationData)
            });

            if (response.ok) {
                const result = await response.json();
                alert("Uğur: " + result.message);
                formElement.reset();
                if (resModal) resModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            } else {
                alert("Xəta: Məlumat bazaya yazıla bilmədi.");
            }
        } catch (error) {
            console.log("Backend sönülüdür və ya tapılmadı", error);
            alert("Xəta: Backend ilə əlaqə qurula bilmədi.");
        }
    };

    const pageForm = document.getElementById('reservationFormPage');
    const modalForm = document.getElementById('reservationFormModal');

    if (pageForm) pageForm.addEventListener('submit', (e) => { e.preventDefault(); handleFormSubmit(pageForm); });
    if (modalForm) modalForm.addEventListener('submit', (e) => { e.preventDefault(); handleFormSubmit(modalForm); });

    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                document.querySelectorAll('.card').forEach(card => {
                    if (card.hasAttribute('data-category')) {
                        card.style.display = (filterValue === 'all' || card.getAttribute('data-category') === filterValue) ? 'block' : 'none';
                    }
                });
            });
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === foodModal || e.target === resModal) {
            if (foodModal) foodModal.classList.add('hidden');
            if (resModal) resModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    const imageModal = document.getElementById('imageModal');
    const openImageBtn = document.getElementById('openImageBtn');
    const closeImageModal = document.getElementById('closeImageModal');

    if (openImageBtn && imageModal) {
        openImageBtn.addEventListener('click', () => {
            imageModal.classList.remove('hidden');
            imageModal.classList.add('flex');
            document.body.style.overflow = 'hidden'; 
        });
    }

    if (closeImageModal && imageModal) {
        closeImageModal.addEventListener('click', () => {
            imageModal.classList.add('hidden');
            imageModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });
    }

    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.add('hidden');
                imageModal.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }
        });
    }
});