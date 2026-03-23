document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. SELECTORS & STATE
    // =========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const eventsGrid = document.getElementById('eventsGrid');
    const noResults = document.getElementById('noResults');

    // Local Storage Keys
    const REG_KEY = 'eventify_registrations';
    const CAL_KEY = 'eventify_calendar';

    // Load states from LocalStorage
    let registeredEvents = JSON.parse(localStorage.getItem(REG_KEY)) || [];
    let calendarEvents = JSON.parse(localStorage.getItem(CAL_KEY)) || [];

    // =========================================
    // 2. CORE UTILITIES
    // =========================================
    const saveState = () => {
        localStorage.setItem(REG_KEY, JSON.stringify(registeredEvents));
        localStorage.setItem(CAL_KEY, JSON.stringify(calendarEvents));
    };

    const updateCardUI = (card) => {
        const title = card.querySelector('h3').textContent.trim();
        const regBtn = card.querySelector('.register-btn');
        const calBtn = card.querySelector('.calendar-btn');

        // Update Registration Button
        if (registeredEvents.includes(title)) {
            card.classList.add('is-registered');
            regBtn.textContent = "Registered";
            regBtn.style.backgroundColor = "#6c757d";
        } else {
            card.classList.remove('is-registered');
            regBtn.textContent = "Apply";
            regBtn.style.backgroundColor = "#0e5db6";
        }

        // Update Calendar Button
        if (calendarEvents.includes(title)) {
            calBtn.innerHTML = '<i class="fas fa-check"></i> Added';
            calBtn.style.backgroundColor = "#27ae60";
            calBtn.style.color = "#fff";
        } else {
            calBtn.innerHTML = '<i class="far fa-calendar-plus"></i> Add to Calendar';
            calBtn.style.backgroundColor = "#fff";
            calBtn.style.color = "#555";
        }
    };

    // =========================================
    // 3. EVENT HANDLERS
    // =========================================
    const handleApply = (card, title, link) => {
        if (!registeredEvents.includes(title)) {
            registeredEvents.push(title);
            saveState();
            updateCardUI(card);
            if (link) window.open(link, '_blank');
        } else {
            if (link) window.open(link, '_blank');
        }
        filterAllEvents();
    };

    const handleCalendar = (card, title) => {
        if (calendarEvents.includes(title)) {
            calendarEvents = calendarEvents.filter(t => t !== title);
            alert("Removed from local calendar view.");
        } else {
            calendarEvents.push(title);
            // Function to trigger actual Google Calendar Redirect
            openGoogleCalendar(card);
        }
        saveState();
        updateCardUI(card);
    };

    const openGoogleCalendar = (card) => {
        const title = card.querySelector('h3').innerText;
        const location = card.querySelector('.card-location').innerText;
        const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&ctz=Asia/Kolkata`;
        window.open(calendarUrl, '_blank');
    };

    // =========================================
    // 4. FILTERING LOGIC
    // =========================================
    function filterAllEvents() {
        const searchTerm = searchInput.value.toLowerCase();
        let activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
        const cards = document.querySelectorAll('.event-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.querySelector('.badge').textContent.trim();
            const location = card.querySelector('.card-location').textContent.toLowerCase();
            
            const matchesSearch = title.includes(searchTerm) || location.includes(searchTerm);
            
            let matchesCategory = false;
            if (activeCategory === 'all') matchesCategory = true;
            else if (activeCategory === 'Registered') matchesCategory = registeredEvents.includes(card.querySelector('h3').textContent.trim());
            else matchesCategory = (category === activeCategory || (activeCategory === "Students" && category === "Student"));

            if (matchesSearch && matchesCategory) {
                card.style.display = "flex";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        noResults.classList.toggle('hidden', visibleCount > 0);
        noResults.style.display = visibleCount > 0 ? 'none' : 'block';
    }

    // =========================================
    // 5. INITIALIZATION
    // =========================================
    document.querySelectorAll('.event-card').forEach(card => {
        const title = card.querySelector('h3').textContent.trim();
        const regBtn = card.querySelector('.register-btn');
        const calBtn = card.querySelector('.calendar-btn');
        const zoomBtn = card.querySelector('.zoom-btn');
        const link = regBtn.getAttribute('data-link');

        updateCardUI(card);

        regBtn.addEventListener('click', () => handleApply(card, title, link));
        calBtn.addEventListener('click', () => handleCalendar(card, title));
        
        zoomBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = document.getElementById('imageModal');
            const fullImage = document.getElementById('fullImage');
            modal.style.display = "block";
            fullImage.src = card.querySelector('.card-image img').src;
        });
    });

    // Filter Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterAllEvents();
        });
    });

    searchInput.addEventListener('input', filterAllEvents);

    // FAQ Toggle
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Close Modal
    document.querySelector('.close-modal').onclick = () => {
        document.getElementById('imageModal').style.display = "none";
    };
});