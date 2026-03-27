document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. DATA LAYER (Frontend-Only Architecture)
    // =========================================
    const volunteerEvents = [
        { _id: "vol_1", eventName: "Modern Art Exhibition", category: "Exhibition", organizationName: "JJ School Of Art", date: "2026-04-05T16:00:00", time: "16:00", address: "JJ School Of Art, Vikhroli West", city: "Mumbai", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "exhibition@jjschool.ac.in", mobileNumber: "+91 22 4000 5000", impact: { sdgScore: 85 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_2", eventName: "Street Food Carnival", category: "Marketing", organizationName: "Tasty Bites", date: "2026-03-12T17:00:00", time: "17:00", address: "Shop No.9 FC Road", city: "Pune", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "hello@tastybites.com", mobileNumber: "+91 99223 34455", impact: { sdgScore: 110 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_3", eventName: "City Marathon 2025", category: "Health", organizationName: "Fit India", date: "2026-02-01T06:00:00", time: "06:00", address: "Marine Drive", city: "Mumbai", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "run@fitindia.gov.in", mobileNumber: "+91 11 2345 6789", impact: { sdgScore: 130 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_4", eventName: "Startup Networking", category: "Marketing", organizationName: "Pune Startups", date: "2026-01-25T19:00:00", time: "19:00", address: "Baner", city: "Pune", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "connect@punestartups.in", mobileNumber: "+91 77777 66666", impact: { sdgScore: 60 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_5", eventName: "Robotics Workshop Exhibition", category: "Exhibition", organizationName: "EduTech Sol", date: "2026-02-20T10:00:00", time: "10:00", address: "Pimpri Chinchwad", city: "Pune", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "workshops@edutech.com", mobileNumber: "+91 20 8899 0011", impact: { sdgScore: 105 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_6", eventName: "Neon Nights: Music Festival", category: "Students", organizationName: "Live Wire Events", date: "2026-04-15T19:00:00", time: "19:00", address: "Amanora Park Town", city: "Pune", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "tickets@livewire.com", mobileNumber: "+91 90000 10000", impact: { sdgScore: 40 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_7", eventName: "2-day Hackathon Technomela", category: "Students", organizationName: "Sinhgad College Of Engineering", date: "2026-03-22T10:00:00", time: "10:00", address: "Sinhgad STIC, Vadgaon BK", city: "Pune", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "hackathon@sinhgad.edu", mobileNumber: "+91 20 2410 0000", impact: { sdgScore: 140 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_8", eventName: "Food donation Drive", category: "NGO/Org", organizationName: "Helpage India", date: "2026-04-05T10:30:00", time: "10:30", address: "Indira NGO, Andheri west", city: "Mumbai", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "support@helpage.org", mobileNumber: "+91 22 2600 5000", impact: { sdgScore: 150 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_9", eventName: "Importance of Charity", category: "NGO/Org", organizationName: "Rotry Club", date: "2026-02-12T11:00:00", time: "11:00", address: "Tilak Smarak Hall", city: "Nashik", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "nashik@rotary.org", mobileNumber: "+91 253 1234 567", impact: { sdgScore: 90 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_10", eventName: "Organic Farmers Market", category: "Marketing", organizationName: "Farm to Table", date: "2026-02-05T08:00:00", time: "08:00", address: "Kalyani Nagar", city: "Pune", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "fresh@farmtable.com", mobileNumber: "+91 20 6600 7700", impact: { sdgScore: 110 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_11", eventName: "Political Rally", category: "Political", organizationName: "PL United Board", date: "2026-01-23T09:00:00", time: "09:00", address: "DY Patil Stadium", city: "Navi Mumbai", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "press@plunited.com", mobileNumber: "+91 22 8888 8888", impact: { sdgScore: 30 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_12", eventName: "Digital Marketing Seminar", category: "Marketing", organizationName: "Growth Hackers", date: "2026-03-12T14:00:00", time: "14:00", address: "A-Building 4th Floor Hall No.4, Civil Lines", city: "Nagpur", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "grow@hackers.com", mobileNumber: "+91 712 2555 666", impact: { sdgScore: 50 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" },
        { _id: "vol_13", eventName: "Yoga Shibir", category: "Health", organizationName: "Pune Yoga Group", date: "2026-01-30T10:00:00", time: "10:00", address: "Saras Baug", city: "Pune", imagePath: "../assets/images/volunteer.jpeg", brochurePath: "../assets/demo/Demo Brochure.pdf", organizerEmail: "namaste@puneyoga.in", mobileNumber: "+91 99999 11111", impact: { sdgScore: 120 }, formLink: "https://forms.gle/GoE6hh7zCEDhzwB2A" }
    ];

    // =========================================
    // 2. LOCAL STATE MANAGEMENT
    // =========================================
    let isLoggedIn = localStorage.getItem('demo_vol_isLoggedIn') === 'true';
    let appliedEvents = new Set(JSON.parse(localStorage.getItem('demo_vol_applications') || '[]'));

    const getCalendarEvents = () => JSON.parse(localStorage.getItem('demo_vol_calendar') || '[]');
    const isEventInCalendar = (id) => getCalendarEvents().includes(id);
    const toggleCalendarEvent = (id) => {
        let events = getCalendarEvents();
        if (events.includes(id)) events = events.filter(e => e !== id);
        else events.push(id);
        localStorage.setItem('demo_vol_calendar', JSON.stringify(events));
    };

    // =========================================
    // 3. UI ELEMENT SELECTORS
    // =========================================
    const eventList = document.getElementById('eventsGrid');
    const noEventsMessage = document.getElementById('noResults');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');

    // Modals
    const loginModal = document.getElementById('loginModal');
    const imageModal = document.getElementById('imageModal');
    const sdgModal = document.getElementById('sdgModal');
    const reportModal = document.getElementById('reportModal');

    // =========================================
    // 4. DATE & CALENDAR HELPERS
    // =========================================
    const getMonthName = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date) ? 'Jan' : date.toLocaleString('default', { month: 'short' });
    };
    const getDayNumber = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date) ? '01' : date.getDate();
    };
    const getYear = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date) ? '2026' : date.getFullYear();
    };
    const formatTime12Hour = (timeStr) => {
        if (!timeStr) return 'TBD';
        const [hours, minutes] = timeStr.split(':');
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        return `${h % 12 || 12}:${minutes} ${ampm}`;
    };

    const addToGoogleCalendar = (event) => {
        const dateObj = new Date(`${event.date.split('T')[0]}T${event.time}:00`);
        if (isNaN(dateObj.getTime())) return alert("Could not parse date.");
        
        const pad = (n) => n < 10 ? '0' + n : n;
        const startDateTime = `${dateObj.getFullYear()}${pad(dateObj.getMonth() + 1)}${pad(dateObj.getDate())}T${pad(dateObj.getHours())}${pad(dateObj.getMinutes())}00`;
        
        dateObj.setHours(dateObj.getHours() + 1);
        const endDateTime = `${dateObj.getFullYear()}${pad(dateObj.getMonth() + 1)}${pad(dateObj.getDate())}T${pad(dateObj.getHours())}${pad(dateObj.getMinutes())}00`;

        const location = `${event.address}, ${event.city}`;
        const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.eventName)} (Volunteer)&location=${encodeURIComponent(location)}&dates=${startDateTime}/${endDateTime}&ctz=Asia/Kolkata`;
        window.open(calendarUrl, '_blank');
    };

    // =========================================
    // 5. RENDER DOM ENGINE
    // =========================================
    const createEventCard = (event) => {
        const card = document.createElement('div');
        card.className = 'event-card dynamic-card';

        // Conditional SDG logic (Only rendered if score >= 100)
        const sdgScore = event.impact?.sdgScore || 0;
        const sdgBadgeHTML = sdgScore >= 100 ? `
            <button class="certificate-icon" title="View SDG Status" data-score="${sdgScore}">
                <i class="fas fa-certificate active-badge"></i>
            </button>
        ` : '';

        // Application State
        const isApplied = appliedEvents.has(event._id);
        const applyBtnText = isApplied ? 'Applied' : 'Apply';
        const applyBtnStyle = isApplied ? 'background-color: #6c757d; color: #fff; cursor: default;' : 'background-color: #0e5db6; color: #fff;';

        // Calendar State
        const isCal = isEventInCalendar(event._id);
        const calBtnHTML = isCal ? `<i class="fas fa-check"></i> Added` : `<i class="far fa-calendar-plus"></i> Add to Calendar`;
        const calBtnStyle = isCal ? 'background-color: #27ae60; color: #fff; border-color: #27ae60;' : '';

        card.innerHTML = `
            <div class="card-image">
                <div class="kebab-menu">
                    <button class="kebab-icon"><i class="fas fa-ellipsis-v"></i></button>
                    <div class="dropdown-content">
                        <a href="#" class="report-btn"><i class="fas fa-flag"></i> Report</a>
                    </div>
                </div>
                <img src="${event.imagePath}" alt="${event.eventName}" onerror="this.src='https://placehold.co/400x200?text=No+Image'">
                <span class="badge" style="text-transform: none;">${event.category}</span>
                <button class="zoom-btn"><i class="fas fa-expand"></i></button>
            </div>
            <div class="card-content">
                <div class="card-header-row">
                    <h3>${event.eventName}</h3>
                    <div class="header-icons">
                        <a href="${event.brochurePath}" download class="brochure-icon" title="Download Brochure" target="_blank">
                            <i class="fas fa-file-pdf"></i>
                        </a>
                        ${sdgBadgeHTML} 
                    </div>
                </div>
                <div class="card-org">Organized by: <strong>${event.organizationName}</strong></div>
                <p class="date">${getMonthName(event.date)} ${getDayNumber(event.date)}, ${getYear(event.date)} • ${formatTime12Hour(event.time)}</p>
                <div class="card-contact">
                    <h4>Contact Details</h4>
                    <p><i class="fas fa-envelope"></i> ${event.organizerEmail || 'N/A'}</p>
                    <p><i class="fas fa-phone"></i> ${event.mobileNumber || 'N/A'}</p>
                </div>
                <div class="card-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <a href="https://www.google.com/maps/search/?api=1&query=$" target="_blank">${event.address}, ${event.city}</a>
                </div>
                <div class="card-actions">
                    <button class="register-btn" style="${applyBtnStyle}" ${isApplied ? 'disabled' : ''}>${applyBtnText}</button>
                    <button class="calendar-btn" style="${calBtnStyle}">${calBtnHTML}</button>
                </div>
            </div>
        `;

        // Action Handlers
        card.querySelector('.register-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (isLoggedIn) {
                if (!isApplied) {
                    appliedEvents.add(event._id);
                    localStorage.setItem('demo_vol_applications', JSON.stringify([...appliedEvents]));
                    if (event.formLink) window.open(event.formLink, '_blank');
                    renderEvents(); 
                }
            } else {
                loginModal.style.display = 'block';
            }
        });

        card.querySelector('.calendar-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isCal) addToGoogleCalendar(event);
            toggleCalendarEvent(event._id);
            renderEvents(); 
        });

        card.querySelector('.zoom-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const fullImage = document.getElementById('fullImage');
            if (imageModal && fullImage) {
                imageModal.style.display = "block";
                fullImage.src = event.imagePath;
                document.getElementById('caption').textContent = event.eventName;
            }
        });

        const certBtn = card.querySelector('.certificate-icon');
        if (certBtn) {
            certBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                document.getElementById('sdgModalTitle').innerText = "SDG Badge Awarded!";
                document.getElementById('sdgModalTitle').style.color = "#f59e0b";
                document.getElementById('sdgModalIcon').className = "fas fa-award active-modal-badge";
                document.getElementById('sdgModalMessage').innerText = `Congratulations! This event has achieved an outstanding SDG Score of ${sdgScore}, demonstrating a strong commitment to the UN's Sustainable Development Goals.`;
                sdgModal.style.display = "flex";
            });
        }

        card.addEventListener('click', (e) => {
            if (e.target.closest('button, a, .kebab-icon')) return;
            window.open(`Event-card-click(volunteer).html?id=${event._id}&source=volunteer`, '_blank');
        });

        return card;
    };

    // =========================================
    // 6. FILTERING LOGIC
    // =========================================
    const renderEvents = () => {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let activeCategory = 'all';

        filterBtns.forEach(btn => {
            if (btn.classList.contains('active')) activeCategory = btn.getAttribute('data-category');
        });

        eventList.innerHTML = '';
        let visibleCount = 0;

        volunteerEvents.forEach(event => {
            let matchesCategory = activeCategory === 'all' || event.category === activeCategory;
            if (activeCategory === 'Applied Events') matchesCategory = isLoggedIn && appliedEvents.has(event._id);

            const matchesSearch = event.eventName.toLowerCase().includes(searchTerm) || 
                                  event.city.toLowerCase().includes(searchTerm) || 
                                  event.category.toLowerCase().includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                eventList.appendChild(createEventCard(event));
                visibleCount++;
            }
        });

        if (noEventsMessage) {
            noEventsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    };

    if (filterBtns) {
        filterBtns.forEach(button => {
            button.addEventListener('click', () => {
                filterBtns.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderEvents();
            });
        });
    }

    if (searchInput) searchInput.addEventListener('input', renderEvents);

    renderEvents(); // Initial Run

    // =========================================
    // 7. MODALS & GLOBAL INTERACTIONS
    // =========================================
    document.getElementById('modal-login-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        isLoggedIn = true;
        localStorage.setItem('demo_vol_isLoggedIn', 'true');
        loginModal.style.display = 'none';
        renderEvents();
        alert("Logged in successfully! You can now apply for events.");
    });

    const closeModals = () => {
        [loginModal, imageModal, sdgModal, reportModal].forEach(m => {
            if (m) m.style.display = 'none';
        });
    };

    document.querySelectorAll('.close-modal, .close-login-modal, .close-sdg-modal, .close-report-modal').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    window.addEventListener('click', (e) => {
        if ([loginModal, imageModal, sdgModal, reportModal].includes(e.target)) closeModals();
    });

    document.addEventListener('click', (e) => {
        const kebabIcon = e.target.closest('.kebab-icon');
        if (kebabIcon) {
            e.stopPropagation();
            document.querySelectorAll('.dropdown-content.show').forEach(m => {
                if (m !== kebabIcon.nextElementSibling) m.classList.remove('show');
            });
            kebabIcon.nextElementSibling.classList.toggle('show');
            return;
        }

        const reportBtn = e.target.closest('.report-btn');
        if (reportBtn) {
            e.stopPropagation();
            reportBtn.closest('.dropdown-content').classList.remove('show');
            if (reportModal) {
                reportModal.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
                reportModal.style.display = 'block';
            }
            return;
        }

        if (!e.target.closest('.kebab-menu')) {
            document.querySelectorAll('.dropdown-content.show').forEach(m => m.classList.remove('show'));
        }
    });

    document.querySelectorAll('input[name="reportReason"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                setTimeout(() => {
                    alert("Your report has been submitted to the moderation team.");
                    if (reportModal) reportModal.style.display = 'none';
                }, 150);
            }
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('nav-active'));
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.addEventListener('click', () => navLinks.classList.remove('nav-active'));
        });
    }

    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (question && answer) {
            question.addEventListener('click', () => {
                document.querySelectorAll('.faq-item').forEach(other => {
                    if (other !== item && other.classList.contains('active')) {
                        other.classList.remove('active');
                        other.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                item.classList.toggle('active');
                answer.style.maxHeight = item.classList.contains('active') ? answer.scrollHeight + "px" : null;
            });
        }
    });
});


