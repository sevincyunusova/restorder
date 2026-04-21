document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENTLƏRİ TUTURUQ ---
    const foodModal = document.getElementById('foodModal');
    const closeFoodBtn = document.getElementById('closeFoodModal');
    const resModal = document.getElementById('reservationModal');
    const openResBtns = document.querySelectorAll('.openModalBtn');
    const closeResBtn = document.getElementById('closeModal');
    const foodCards = document.querySelectorAll('.card[data-name]');

    // --- 2. YEMƏK POPUP AÇILMASI ---
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

            foodModal.classList.remove('hidden');
            foodModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeFoodBtn) {
        closeFoodBtn.addEventListener('click', () => {
            foodModal.classList.add('hidden');
            foodModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });
    }

    // --- 3. SİFARİŞ ET DÜYMƏSİ (POPUP DAXİLİNDƏ) ---
    // Burada daha etibarlı bir üsuldan istifadə edirik: 
    // Popup daxilindəki "Sifariş Et" yazılan düyməni tapırıq
    foodModal.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.innerText.includes('Sifariş Et')) {
            const foodName = document.getElementById('modalFoodName').innerText;
            
            // ALERT BURADADIR
            alert(foodName + " seçildi! Zəhmət olmasa rezervasiyanı tamamlayın.");

            // Popup-ı bağla
            foodModal.classList.add('hidden');
            foodModal.classList.remove('flex');
            
            // Rezervasiya modalını aç
            if (resModal) {
                resModal.classList.remove('hidden');
                resModal.classList.add('flex');
                const messageArea = resModal.querySelector('textarea[name="message"]');
                if (messageArea) {
                    messageArea.value = `Mən "${foodName}" sifariş etmək istəyirəm. `;
                }
            }
        }
    });

    // --- 4. REZERVASİYA MODALI (AÇ/BAĞLA) ---
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

    if (closeResBtn) {
        closeResBtn.addEventListener('click', () => {
            resModal.classList.add('hidden');
            resModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });
    }

    // --- 5. BACKEND-Ə GÖNDƏRMƏ (API) ---
    const handleFormSubmit = async (formElement) => {
        const formData = new FormData(formElement);
        const reservationData = {
            fullName: formData.get('fullName'),
            phoneNumber: formData.get('phoneNumber')?.toString() || "",
            email: formData.get('email'),
            reservationDate: formData.get('reservationDate'),
            reservationTime: formData.get('reservationTime'),
            seatsCount: parseInt(formData.get('seatsCount')) || 1,
            message: formData.get('message') || ""
        };

        try {
            const response = await fetch('http://localhost:5152/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservationData)
            });

            if (response.ok) {
                alert("Uğur: Rezervasiyanız qəbul edildi!");
                formElement.reset();
                if (resModal) resModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            } else {
                alert("Xəta: Məlumat göndərilmədi.");
            }
        } catch (error) {
            console.log("Backend sönülüdür");
        }
    };

    const pageForm = document.getElementById('reservationFormPage');
    const modalForm = document.getElementById('reservationFormModal');

    if (pageForm) pageForm.addEventListener('submit', (e) => { e.preventDefault(); handleFormSubmit(pageForm); });
    if (modalForm) modalForm.addEventListener('submit', (e) => { e.preventDefault(); handleFormSubmit(modalForm); });

    // --- 6. MENU FİLTRASİYASI ---
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

    // Kənara klikləyəndə bağla
    window.addEventListener('click', (e) => {
        if (e.target === foodModal || e.target === resModal) {
            if (foodModal) foodModal.classList.add('hidden');
            if (resModal) resModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
});