// =========================================
// 1. MOBILE MENU TOGGLE
// =========================================
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('nav-active');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    
    // =========================================
    // 2. MOCK EVENT DATA (No Backend required)
    // =========================================
    const eventData = {
        id: 'evt_future_ai_123',
        title: 'Future AI Summit',
        description: 'Future AI Summit brings together innovators, developers, and industry leaders to explore the future of AI/ML, blockchain and decentralized technologies.',
        location: 'NBN Sinhgad School of Engineering, Pune',
        dateStr: '2026-09-10T21:00:00', // Sep 10, 2026 at 9:00 PM
        mockDistanceKm: 6.7
    };

    // =========================================
    // 3. TEXT OVERFLOW / READ MORE
    // =========================================
    const eventText = document.getElementById('eventText');
    const container = document.getElementById('eventTextContainer');

    function checkOverflow() {
        const existingBtn = container.querySelector('.toggle-link');
        if (existingBtn) existingBtn.remove();

        if (eventText.scrollHeight > eventText.clientHeight) {
            const btn = document.createElement('a');
            btn.className = 'toggle-link';
            btn.textContent = 'Read more';
            btn.href = 'javascript:void(0)';
            container.appendChild(btn);

            btn.addEventListener('click', function() {
                if (eventText.classList.contains('collapsed')) {
                    eventText.classList.replace('collapsed', 'expanded');
                    this.textContent = ' Read less';
                    eventText.appendChild(this);
                } else {
                    eventText.classList.replace('expanded', 'collapsed');
                    this.textContent = 'Read more';
                    container.appendChild(this);
                }
            });
        }
    }
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    // =========================================
    // 4. ADD TO CALENDAR (Google Cal Format)
    // =========================================
    const calLink = document.querySelector('.calendar-add-link');
    if (calLink) {
        const startDate = new Date(eventData.dateStr);
        const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours duration
        
        const pad = (n) => n < 10 ? '0' + n : n;
        const formatToGoogleDate = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
        
        const gCalUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}&dates=${formatToGoogleDate(startDate)}/${formatToGoogleDate(endDate)}&ctz=Asia/Kolkata`;
        
        calLink.href = gCalUrl;
    }

    // =========================================
    // 5. PDF & REGISTER BUTTONS
    // =========================================
    const pdfBtn = document.getElementById('pdfBtn');
    if(pdfBtn) {
        pdfBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    }

    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            this.textContent = 'Registered';
            this.classList.add('registered');
            this.disabled = true;
        });
    }

    // =========================================
    // 6. LOCAL STORAGE BOOKMARK LOGIC
    // =========================================
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkBtn) {
        // Load initial state
        const storageKey = `bookmark_${eventData.id}`;
        if (localStorage.getItem(storageKey) === 'true') {
            bookmarkBtn.classList.add('active');
            bookmarkBtn.classList.replace('fa-regular', 'fa-solid');
        }
        
        // Toggle state
        bookmarkBtn.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            if (isActive) {
                this.classList.remove('active');
                this.classList.replace('fa-solid', 'fa-regular');
                localStorage.setItem(storageKey, 'false');
            } else {
                this.classList.add('active');
                this.classList.replace('fa-regular', 'fa-solid');
                localStorage.setItem(storageKey, 'true');
            }
        });
    }

    // =========================================
    // 7. DASHBOARD & CHART ANIMATIONS (Mocked)
    // =========================================
    const stats = {
        totalRegistrations: Math.floor(Math.random() * 500) + 1200,
        totalViews: Math.floor(Math.random() * 5000) + 15000,
        monthlyReg: Math.floor(Math.random() * 100) + 250,
        totalEvents: Math.floor(Math.random() * 10) + 45,
        totalVolunteers: Math.floor(Math.random() * 50) + 85
    };

    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    animateValue("totalRegistrations", 0, stats.totalRegistrations, 1500);
    animateValue("totalViews", 0, stats.totalViews, 1500);
    animateValue("monthlyReg", 0, stats.monthlyReg, 1500);
    animateValue("totalEvents", 0, stats.totalEvents, 1500);
    animateValue("totalVolunteers", 0, stats.totalVolunteers, 1500);

    const ctx = document.getElementById('weeklyRegistrationChart');
    if (ctx) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const labels = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            labels.push(days[d.getDay()]);
        }
        const registrationData = labels.map(() => Math.floor(Math.random() * 50) + 10);
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'New Registrations',
                    data: registrationData,
                    backgroundColor: '#3d64ff',
                    borderColor: '#2a4ecc',
                    borderWidth: 1,
                    borderRadius: 5,
                    hoverBackgroundColor: '#2a4ecc'
                }]
            },
            options: {
               responsive: true,
               maintainAspectRatio: false,
               plugins: { legend: { display: false } },
               scales: {
                   y: { beginAtZero: true, grid: { color: '#f0f0f0' }, ticks: { color: '#6f7287', stepSize: 10 } },
                   x: { grid: { display: false }, ticks: { color: '#6f7287' } }
               }
            }
        });
    }

    // =========================================
    // 8. GREENER MOBILITY MODAL (Frontend Only)
    // =========================================
    const greenerBtn = document.getElementById('greener-cta-btn');
    const greenerModal = document.getElementById('greenerModal');
    const closeGreenerBtn = document.getElementById('closeGreenerModal');
    const optionsContainer = document.getElementById('greener-options-container');
    const impactInsight = document.getElementById('greener-impact-insight');

    if (greenerBtn) {
        greenerBtn.addEventListener('click', () => {
            greenerModal.style.display = 'flex';
            populateGreenerOptions();
        });
    }

    if (closeGreenerBtn) {
        closeGreenerBtn.addEventListener('click', () => { greenerModal.style.display = 'none'; });
    }

    window.addEventListener('click', (e) => {
        if (e.target === greenerModal) { greenerModal.style.display = 'none'; }
    });

    function populateGreenerOptions() {
        optionsContainer.innerHTML = ''; // Clear previous
        
        const distance = eventData.mockDistanceKm;
        
        // Static transport logic definitions
        const transportModes = [
            { id: 'car', name: 'Personal Car', icon: 'fa-car', speedKmh: 35, co2PerKm: 170 },
            { id: 'bus', name: 'Public Bus', icon: 'fa-bus', speedKmh: 20, co2PerKm: 82 },
            { id: 'bike', name: 'Bicycle', icon: 'fa-bicycle', speedKmh: 15, co2PerKm: 0, isGreen: true },
            { id: 'walk', name: 'Walking', icon: 'fa-person-walking', speedKmh: 5, co2PerKm: 0, isGreen: true }
        ];

        let carCo2 = 0;
        let busCo2 = 0;

        transportModes.forEach(mode => {
            const timeMins = Math.round((distance / mode.speedKmh) * 60);
            const co2Grams = Math.round(distance * mode.co2PerKm);
            
            if (mode.id === 'car') carCo2 = co2Grams;
            if (mode.id === 'bus') busCo2 = co2Grams;

            const co2Display = mode.isGreen ? 'Zero Emissions <i class="fa-solid fa-leaf"></i>' : `${co2Grams}g CO₂`;
            const co2Class = mode.isGreen ? 'low' : (co2Grams > 500 ? 'high' : '');
            const cardClass = mode.isGreen ? 'transport-card green-choice' : 'transport-card';

            const cardHTML = `
                <div class="${cardClass}">
                    <div class="transport-info">
                        <i class="fa-solid ${mode.icon}"></i>
                        <div class="transport-meta">
                            <h4>${mode.name}</h4>
                            <span>~${timeMins} mins • ${distance} km</span>
                        </div>
                    </div>
                    <div class="transport-co2 ${co2Class}">
                        ${co2Display}
                    </div>
                </div>
            `;
            optionsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Calculate environmental impact (1 smartphone charge ≈ 8.22g CO2)
        const co2SavedGrams = carCo2 - busCo2;
        if (co2SavedGrams > 0) {
            const smartphones = Math.round(co2SavedGrams / 8.22);
            impactInsight.innerHTML = `
                <i class="fa-solid fa-bolt"></i>
                <div>
                    <strong>Commuter Impact:</strong> Choosing the bus over a car today saves enough energy to charge your smartphone <strong>${smartphones.toLocaleString()} times</strong>.
                </div>
            `;
            impactInsight.style.display = 'flex';
        }
    }
});




