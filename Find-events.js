document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // MOBILE NAV
    // =========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('nav-active'));
        document.querySelectorAll('.nav-links a').forEach(a =>
            a.addEventListener('click', () => navLinks.classList.remove('nav-active'))
        );
    }

    // =========================================
    // FAQ
    // =========================================
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;
        question.addEventListener('click', () => {
            document.querySelectorAll('.faq-item.active').forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    other.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            item.classList.toggle('active');
            answer.style.maxHeight = item.classList.contains('active') ? answer.scrollHeight + 'px' : null;
        });
    });

    // =========================================
    // CALENDAR (localStorage)
    // =========================================
    const getCalendarEvents = () => JSON.parse(localStorage.getItem('myCalendarEvents') || '[]');
    const isInCalendar = name => getCalendarEvents().includes(name);

    const toggleCalendar = (name) => {
        let events = getCalendarEvents();
        if (events.includes(name)) {
            events = events.filter(e => e !== name);
        } else {
            events.push(name);
        }
        localStorage.setItem('myCalendarEvents', JSON.stringify(events));
        return events.includes(name);
    };

    const addToGoogleCalendar = (card) => {
        const title = card.querySelector('h3')?.innerText.trim() || 'Event';
        const dateLine = card.querySelector('.date')?.innerText || '';
        let dateStr = '', timeStr = '09:00 AM';
        if (dateLine.includes('•')) {
            [dateStr, timeStr] = dateLine.split('•').map(s => s.trim());
        } else {
            dateStr = dateLine;
        }
        try {
            const dateObj = new Date(dateStr + ' ' + timeStr);
            if (isNaN(dateObj.getTime())) return;
            const pad = n => n < 10 ? '0' + n : n;
            const fmt = d => `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
            const start = fmt(dateObj);
            dateObj.setHours(dateObj.getHours() + 1);
            const end = fmt(dateObj);
            const loc = (card.querySelector('.card-location a') || card.querySelector('.card-location'))?.innerText.trim() || '';
            window.open(`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&location=${encodeURIComponent(loc)}&dates=${start}/${end}&ctz=Asia/Kolkata`, '_blank');
        } catch (e) { /* silent */ }
    };

    const updateCalBtn = (btn, added) => {
        if (added) {
            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            btn.style.cssText = 'background:#27ae60;color:#fff;border-color:#27ae60';
        } else {
            btn.innerHTML = '<i class="far fa-calendar-plus"></i> Add to Calendar';
            btn.style.cssText = 'background:#fff;color:#555;border-color:#ccc';
        }
    };

    // =========================================
    // INIT CARDS
    // =========================================
    document.querySelectorAll('.event-card').forEach(card => {
        const badge = card.querySelector('.badge');
        card.setAttribute('data-category', badge?.textContent.trim() || 'Other');

        const locLink = card.querySelector('.card-location a');
        if (locLink) card.setAttribute('data-location', locLink.textContent.trim());

        const title = card.querySelector('h3')?.textContent.trim() || '';

        // Calendar button
        const calBtn = card.querySelector('.calendar-btn');
        if (calBtn) {
            updateCalBtn(calBtn, isInCalendar(title));
            calBtn.addEventListener('click', () => {
                if (isInCalendar(title)) {
                    toggleCalendar(title);
                    updateCalBtn(calBtn, false);
                } else {
                    addToGoogleCalendar(card);
                    toggleCalendar(title);
                    updateCalBtn(calBtn, true);
                }
            });
        }

        // Register button
        const regBtn = card.querySelector('.register-btn');
        if (regBtn) {
            const link = regBtn.getAttribute('data-link');
            const registeredKey = 'registered_' + title;
            if (localStorage.getItem(registeredKey)) {
                regBtn.textContent = 'Registered';
                regBtn.style.cssText = 'background:#27ae60;cursor:default';
                card.setAttribute('data-registered', 'true');
            }
            if (link) regBtn.addEventListener('click', () => {
                window.open(link, '_blank');
                localStorage.setItem(registeredKey, '1');
                regBtn.textContent = 'Registered';
                regBtn.style.cssText = 'background:#27ae60;cursor:default';
                card.setAttribute('data-registered', 'true');
            });
        }

        // Zoom button
        const zoomBtn = card.querySelector('.zoom-btn');
        if (zoomBtn) {
            zoomBtn.addEventListener('click', e => {
                e.stopPropagation();
                const img = card.querySelector('.card-image img');
                const modal = document.getElementById('imageModal');
                const fullImage = document.getElementById('fullImage');
                const caption = document.getElementById('caption');
                if (modal && fullImage && img) {
                    modal.style.display = 'block';
                    fullImage.src = img.src;
                    caption.textContent = title;
                }
            });
        }
    });

    // =========================================
    // FILTER & SEARCH
    // =========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');

    function filterEvents() {
        const term = searchInput?.value.toLowerCase().trim() || '';
        let activeCategory = 'all';
        filterBtns.forEach(btn => { if (btn.classList.contains('active')) activeCategory = btn.getAttribute('data-category'); });

        let count = 0;
        document.querySelectorAll('.event-card').forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const category = card.getAttribute('data-category') || '';
            const location = (card.getAttribute('data-location') || '').toLowerCase();

            const isRegistered = card.getAttribute('data-registered') === 'true';
            const matchSearch = !term || title.includes(term) || category.toLowerCase().includes(term) || location.includes(term);
            const matchCategory = activeCategory === 'all' || category === activeCategory || (activeCategory === 'Registered' && isRegistered);

            const show = matchSearch && matchCategory;
            card.style.display = show ? 'flex' : 'none';
            if (show) count++;
        });

        if (noResults) noResults.style.display = count === 0 ? 'block' : 'none';
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterEvents();
        });
    });
    searchInput?.addEventListener('input', filterEvents);

    // URL category param
    const categoryParam = new URLSearchParams(window.location.search).get('category');
    if (categoryParam) {
        const decoded = decodeURIComponent(categoryParam);
        filterBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-category') === decoded));
    }

    filterEvents();

    // =========================================
    // IMAGE MODAL
    // =========================================
    const imageModal = document.getElementById('imageModal');
    document.querySelector('.close-modal')?.addEventListener('click', () => { if (imageModal) imageModal.style.display = 'none'; });
    window.addEventListener('click', e => { if (e.target === imageModal) imageModal.style.display = 'none'; });
});
