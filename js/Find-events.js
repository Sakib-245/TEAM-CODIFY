document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. DATA LAYER (Frontend-Only Architecture)
    // =========================================
    const eventsData = [
        { _id: "evt_1", eventName: "Summer Jazz Festival", category: "Other", organizationName: "JJ Organisation", date: "2026-08-24T18:00:00", time: "18:00", address: "Empire Hills Ground, Andheri West, Mumbai", city: "Mumbai", imagePath: "../assets/images/Dj.jpeg", organizerLogo: "../assets/images/JJ-organisation.jpeg", brochurePath: "./demo/Demo%20Brochure.pdf", organizerEmail: "contact@jjorg.demo", mobileNumber: "+91 9876543210", impact: { sdgScore: 85 } },
        { _id: "evt_2", eventName: "Future AI Summit", category: "Education", organizationName: "Tech Pune", date: "2026-09-10T09:00:00", time: "09:00", address: "NBN Sinhgad School of Engineering, Pune", city: "Pune", imagePath: "../assets/images/Tech.jpeg", organizerLogo: "../assets/images/Tech-pune.jpeg", brochurePath: "../assets/demo/Demo%20Brochure.pdf", organizerEmail: "info@techpune.demo", mobileNumber: "+91 9876543211", impact: { sdgScore: 120 } },
        { _id: "evt_3", eventName: "Zero Hunger Drive", category: "NGO/Org", organizationName: "Feed India", date: "2026-09-15T11:00:00", time: "11:00", address: "Ganesh Kala Krida, Saras Baug, Pune", city: "Pune", imagePath: "../assets/images/Zero-hunger.jpeg", organizerLogo: "../assets/images/default-img.png", brochurePath: "./demo/Demo%20Brochure.pdf", organizerEmail: "help@feedindia.demo", mobileNumber: "+91 9876543212", impact: { sdgScore: 150 } },
        { _id: "evt_4", eventName: "Modern Art Exhibition", category: "Exhibition", organizationName: "JJ School Of Art", date: "2026-10-05T16:00:00", time: "16:00", address: "JJ School Of Art, Vikhroli West, Mumbai", city: "Mumbai", imagePath: "../assets/images/ART.jpeg", organizerLogo: "../assets/images/JJ-organisation.jpeg", brochurePath: "./demo/Demo%20Brochure.pdf", organizerEmail: "events@jjschool.demo", mobileNumber: "+91 9876543213", impact: { sdgScore: 40 } },
        { _id: "evt_5", eventName: "Street Food Carnival", category: "Other", organizationName: "Tasty Bites", date: "2026-11-12T17:00:00", time: "17:00", address: "Shop No.9 FC Road, Pune, Maharashtra", city: "Pune", imagePath: "../assets/images/Street-food-carnival.jpg", organizerLogo: "../assets/images/default-img.png", brochurePath: "./demo/Demo%20Brochure.pdf", organizerEmail: "hello@tastybites.demo", mobileNumber: "+91 9876543214", impact: { sdgScore: 60 } },
        { _id: "evt_6", eventName: "City Marathon 2026", category: "Health", organizationName: "Fit India", date: "2026-12-01T06:00:00", time: "06:00", address: "Marine Drive, Mumbai", city: "Mumbai", imagePath: "../assets/images/pune-marathon.jpeg", organizerLogo: "../assets/images/default-img.png", brochurePath: "./demo/Demo%20Brochure.pdf", organizerEmail: "marathon@fitindia.demo", mobileNumber: "+91 9876543215", impact: { sdgScore: 110 } }
    ];

    // =========================================
    // 2. STATE MANAGEMENT 
    // =========================================
    let isLoggedIn = localStorage.getItem('demo_isLoggedIn') === 'true';
    let attendeeRegistrations = new Set(JSON.parse(localStorage.getItem('demo_registrations') || '[]'));

    const getCalendarEvents = () => JSON.parse(localStorage.getItem('demo_calendarEvents') || '[]');
    const isEventInCalendar = (id) => getCalendarEvents().includes(id);
    const toggleCalendarEvent = (id) => {
        let events = getCalendarEvents();
        if (events.includes(id)) events = events.filter(e => e !== id);
        else events.push(id);
        localStorage.setItem('demo_calendarEvents', JSON.stringify(events));
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
    const nearbyModal = document.getElementById('nearbyTypeModal');

    // =========================================
    // 3.5. URL PARAMETER HANDLING
    // =========================================
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');

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
        const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.eventName)}&location=${encodeURIComponent(location)}&dates=${startDateTime}/${endDateTime}&ctz=Asia/Kolkata`;
        window.open(calendarUrl, '_blank');
    };

    // =========================================
    // 5. RENDER DOM ENGINE
    // =========================================
    const createEventCard = (event) => {
        const card = document.createElement('div');
        card.className = 'event-card dynamic-card';

        const sdgScore = event.impact?.sdgScore || 0;
        const sdgBadgeHTML = sdgScore >= 100 ? `
            <button class="certificate-icon" title="View SDG Status" data-score="${sdgScore}">
                <i class="fas fa-certificate active-badge"></i>
            </button>
        ` : '';

        const isReg = attendeeRegistrations.has(event._id);
        const regBtnText = isReg ? 'Registered' : 'Register';
        const regBtnStyle = isReg ? 'background-color: #6c757d; color: #fff; cursor: default;' : 'background-color: #32CD32; color: #fff;';

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
                <div class="card-org">
                    <img src="${event.organizerLogo}" alt="Organizer Logo" class="organizer-logo">
                    <span>Organized by: <strong>${event.organizationName}</strong></span>
                </div>
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
                    <button class="register-btn" style="${regBtnStyle}" ${isReg ? 'disabled' : ''}>${regBtnText}</button>
                    <button class="calendar-btn" style="${calBtnStyle}">${calBtnHTML}</button>
                </div>
            </div>
        `;

        card.querySelector('.register-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (isLoggedIn) {
                if (!isReg) {
                    attendeeRegistrations.add(event._id);
                    localStorage.setItem('demo_registrations', JSON.stringify([...attendeeRegistrations]));
                    renderEvents(); 
                    alert("Registered successfully!");
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
                document.getElementById('sdgModalMessage').innerText = `Congratulations! This event has achieved an outstanding SDG Score of ${sdgScore}.`;
                sdgModal.style.display = "flex";
            });
        }

        card.addEventListener('click', (e) => {
            if (e.target.closest('button, a, .kebab-icon')) return;
            window.open(`Event-card-click(2)findevents.html?id=${event._id}&source=volunteer`, '_blank');
        });

        return card;
    };

    const renderEvents = () => {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let activeCategory = 'all';

        filterBtns.forEach(btn => {
            if (btn.classList.contains('active')) activeCategory = btn.getAttribute('data-category');
        });

        eventList.innerHTML = '';
        let visibleCount = 0;

        eventsData.forEach(event => {
            let matchesCategory = activeCategory === 'all' || event.category === activeCategory;
            if (activeCategory === 'Registered') matchesCategory = isLoggedIn && attendeeRegistrations.has(event._id);

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

    // Set initial category from URL parameter
    if (selectedCategory && filterBtns) {
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-category') === selectedCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    renderEvents(); // Initial render

    // =========================================
    // 6. NEARBY EVENTS FLOW & GEOLOCATION API 
    // =========================================
    const navNearbyLink = document.getElementById('navNearbyLink');
    const nearbyStatus = document.getElementById('geoStatus');

    // Show Nearby Type Modal when clicking "Nearby me"
    if (navNearbyLink && nearbyModal) {
        navNearbyLink.addEventListener('click', (e) => {
            e.preventDefault();
            nearbyModal.style.display = 'block';
            if(nearbyStatus) nearbyStatus.style.display = 'none'; // Reset status on reopen
        });
    }

    // Handle Type Selection & Geolocation
    document.querySelectorAll('.nearby-type-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedType = btn.getAttribute('data-type');
            
            // 1. Cache the selection locally to be picked up by nearby-events.js
            sessionStorage.setItem('selectedNearbyType', selectedType);

            // 2. Feedback UI for loading state
            if (nearbyStatus) {
                nearbyStatus.style.display = 'block';
                nearbyStatus.className = 'status-message';
                nearbyStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Requesting location access...';
                nearbyStatus.style.backgroundColor = '#e3f2fd';
                nearbyStatus.style.color = '#1565c0';
            }

            // 3. Native Browser Geolocation API Request
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // Success: Save exact coords so the Maps API doesn't need to ask again
                        sessionStorage.setItem('cachedLat', position.coords.latitude);
                        sessionStorage.setItem('cachedLng', position.coords.longitude);
                        window.location.href = `./nearby-events.html?type=${encodeURIComponent(selectedType)}`;
                    },
                    (error) => {
                        // Error/Denied: Proceed but let the map handle the fallback mechanism
                        console.warn("Location access denied or timed out.", error);
                        if (nearbyStatus) {
                            nearbyStatus.className = 'status-message status-error';
                            nearbyStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Location denied. Loading map defaults...';
                        }
                        // Short delay for UX so user can read the error before redirect
                        setTimeout(() => {
                            window.location.href = `./nearby-events.html?type=${encodeURIComponent(selectedType)}`;
                        }, 1200);
                    }
                );
            } else {
                alert("Geolocation is not supported by this browser.");
                window.location.href = `nearby-events.html?type=${encodeURIComponent(selectedType)}`;
            }
        });
    });

    // =========================================
    // 7. GLOBAL MODALS & UTILS
    // =========================================
    document.getElementById('modal-login-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        isLoggedIn = true;
        localStorage.setItem('demo_isLoggedIn', 'true');
        loginModal.style.display = 'none';
        renderEvents();
        alert("Logged in successfully! You can now register for events.");
    });

    const closeModals = () => {
        [loginModal, imageModal, sdgModal, reportModal, nearbyModal].forEach(m => {
            if (m) m.style.display = 'none';
        });
    };

    document.querySelectorAll('.close-modal, .close-login-modal, .close-sdg-modal, .close-report-modal').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    window.addEventListener('click', (e) => {
        if ([loginModal, imageModal, sdgModal, reportModal, nearbyModal].includes(e.target)) closeModals();
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
                // Close other open FAQ items
                document.querySelectorAll('.faq-item.active').forEach(other => {
                    if (other !== item) {
                        other.classList.remove('active');
                        const otherAnswer = other.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0px';
                        }
                    }
                });

                // Toggle current item
                const wasActive = item.classList.contains('active');
                item.classList.toggle('active');

                if (item.classList.contains('active')) {
                    // Calculate the full height of the content
                    answer.style.maxHeight = 'none';
                    const fullHeight = answer.scrollHeight;
                    answer.style.maxHeight = '0px'; // Reset to 0 for animation

                    // Use setTimeout to ensure the reset happens before setting the full height
                    setTimeout(() => {
                        answer.style.maxHeight = fullHeight + 'px';
                    }, 10);
                } else {
                    // Close the answer
                    answer.style.maxHeight = '0px';
                }
            });
        }
    });
});



