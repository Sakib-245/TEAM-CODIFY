document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. LOCAL STATE: The "Database"
    // =========================================
    let demoEvents = [
        {
            _id: "evt_1", eventName: "Summer Jazz Festival", category: "Other", organizationName: "JJ Organisation",
            date: "2026-08-24T18:00:00", time: "18:00", organizerEmail: "contact@jjorg.demo", mobileNumber: "+91 9876543210",
            address: "Empire Hills Ground, Andheri West, Mumbai", imagePath: "../assets/images/Dj.jpeg",
            needVolunteers: true, volunteerBannerPath: "../assets/images/volunteer.jpeg", volunteerBrochurePath: "#", volunteerFormLink: "#",
            brochurePath: "#", impact: { sdgScore: 85 }
        },
        {
            _id: "evt_2", eventName: "Future AI Summit", category: "Education", organizationName: "Tech Pune",
            date: "2026-09-10T09:00:00", time: "09:00", organizerEmail: "info@techpune.demo", mobileNumber: "+91 9876543211",
            address: "NBN Sinhgad School of Engineering, Pune", imagePath: "../assets/images/Tech.jpeg",
            needVolunteers: false, brochurePath: "#", impact: { sdgScore: 120 }
        },
        {
            _id: "evt_3", eventName: "Zero Hunger Drive", category: "Ngo", organizationName: "Feed India",
            date: "2026-09-15T11:00:00", time: "11:00", organizerEmail: "help@feedindia.demo", mobileNumber: "+91 9876543212",
            address: "Ganesh Kala Krida, Saras Baug, Pune", imagePath: "../assets/images/Zero-hunger.jpeg",
            needVolunteers: true, volunteerBannerPath: "../assets/images/volunteer.jpeg", brochurePath: "#", impact: { sdgScore: 150 }
        },
        {
            _id: "evt_4", eventName: "Modern Art Exhibition", category: "Other", organizationName: "JJ School Of Art",
            date: "2026-10-05T16:00:00", time: "16:00", organizerEmail: "events@jjschool.demo", mobileNumber: "+91 9876543213",
            address: "JJ School Of Art, Vikhroli West, Mumbai", imagePath: "../assets/images/ART.jpeg",
            needVolunteers: false, brochurePath: "#", impact: { sdgScore: 40 }
        },
        {
            _id: "evt_5", eventName: "Street Food Carnival", category: "Other", organizationName: "Tasty Bites",
            date: "2026-11-12T17:00:00", time: "17:00", organizerEmail: "hello@tastybites.demo", mobileNumber: "+91 9876543214",
            address: "Shop No.9 FC Road, Pune, Maharashtra", imagePath: "../assets/images/Street-food-carnival.jpg",
            needVolunteers: true, volunteerBannerPath: "../assets/images/volunteer.jpeg", brochurePath: "#", impact: { sdgScore: 60 }
        }
    ];

    // =========================================
    // 2. UI INTERACTIONS (Nav, FAQ, Modals)
    // =========================================
    // Mobile Menu
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if(question && answer) {
            question.addEventListener('click', () => {
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                item.classList.toggle('active');
                answer.style.maxHeight = item.classList.contains('active') ? answer.scrollHeight + "px" : null;
            });
        }
    });

    // Modals
    const imageModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const captionText = document.getElementById('caption');
    const sdgModal = document.getElementById('sdgModal');
    const staticEditModal = document.getElementById('staticEditModal');

    document.querySelectorAll('.close-modal, .close-sdg-modal, #closeStaticEdit').forEach(btn => {
        btn.addEventListener('click', () => {
            if(imageModal) imageModal.style.display = "none";
            if(sdgModal) sdgModal.style.display = "none";
            if(staticEditModal) staticEditModal.style.display = "none";
        });
    });

    window.onclick = function(event) {
        if (event.target == imageModal) imageModal.style.display = "none";
        if (event.target == sdgModal) sdgModal.style.display = "none";
        if (event.target == staticEditModal) staticEditModal.style.display = "none";
    };

    // =========================================
    // 3. HELPER FUNCTIONS
    // =========================================
    const getMonthName = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? 'Jan' : date.toLocaleString('default', { month: 'short' });
    };
    const getDayNumber = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? '01' : date.getDate();
    };
    const getYear = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? '2026' : date.getFullYear();
    };
    const formatTime12Hour = (timeStr) => {
        if (!timeStr) return 'TBD';
        const [hours, minutes] = timeStr.split(':');
        const h = parseInt(hours, 10);
        if (isNaN(h)) return timeStr;
        const ampm = h >= 12 ? 'PM' : 'AM';
        return `${h % 12 || 12}:${minutes} ${ampm}`;
    };
    const generateCalendarUrl = (event) => {
        try {
            const dateObj = new Date(`${event.date.split('T')[0]}T${event.time || '09:00'}:00`);
            if (isNaN(dateObj.getTime())) return '#';
            const pad = (n) => n < 10 ? '0' + n : n;
            const start = `${dateObj.getFullYear()}${pad(dateObj.getMonth() + 1)}${pad(dateObj.getDate())}T${pad(dateObj.getHours())}${pad(dateObj.getMinutes())}00`;
            dateObj.setHours(dateObj.getHours() + 1);
            const end = `${dateObj.getFullYear()}${pad(dateObj.getMonth() + 1)}${pad(dateObj.getDate())}T${pad(dateObj.getHours())}${pad(dateObj.getMinutes())}00`;
            return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.eventName)}&details=${encodeURIComponent('Organized by ' + event.organizationName)}&location=${encodeURIComponent(event.address)}&dates=${start}/${end}&ctz=Asia/Kolkata`;
        } catch (e) { return '#'; }
    };

    // =========================================
    // 4. CARD CREATION & RENDERING
    // =========================================
    const createdEventsGrid = document.getElementById('createdEventsGrid');
    const noResultsMessage = document.getElementById('noResults');

    const checkEmptyGrid = () => {
        if (createdEventsGrid && noResultsMessage) {
            noResultsMessage.style.display = demoEvents.length === 0 ? 'block' : 'none';
        }
    };

    const createEventCard = (event) => {
        const flipWrapper = document.createElement('div');
        flipWrapper.className = 'card-flip-wrapper';
        const card = document.createElement('div');
        card.className = 'event-card';

        const hasVolunteers = event.needVolunteers === true;
        const calendarUrl = generateCalendarUrl(event);
        const mapsLink = `https://maps.google.com/?q=${encodeURIComponent(event.address)}`;
        
        let displayCategory = (event.category || 'Other').charAt(0).toUpperCase() + (event.category || 'Other').slice(1).toLowerCase();
        const sdgScore = event.impact?.sdgScore || 0;
        const sdgBadgeHTML = sdgScore >= 100 ? `<button class="certificate-icon" data-score="${sdgScore}"><i class="fas fa-certificate active-badge"></i></button>` : '';
        const flipBtnHTML = hasVolunteers ? `<button class="flip-btn" title="Toggle View"><i class="fas fa-sync-alt"></i></button>` : '';

        const sharedDetailsHTML = `
            <div class="card-org">Organized by: <strong>${event.organizationName}</strong></div>
            <p class="date">${getMonthName(event.date)} ${getDayNumber(event.date)}, ${getYear(event.date)} � ${formatTime12Hour(event.time)}</p>
            <div class="card-contact">
                <h4>Contact Details</h4>
                <p><i class="fas fa-envelope"></i> ${event.organizerEmail}</p>
                <p><i class="fas fa-phone"></i> ${event.mobileNumber}</p>
            </div>
            <div class="card-location">
                <i class="fas fa-map-marker-alt"></i><a href="${mapsLink}" target="_blank">${event.address}</a>
            </div>
        `;

        const frontHTML = `
            <div class="card-front">
                <div class="card-image">
                    <button class="delete-btn" title="Delete Event"><i class="fas fa-trash-alt"></i></button>
                    <button class="edit-btn" title="Edit Event"><i class="fas fa-edit"></i></button>
                    ${flipBtnHTML}
                    <img src="${event.imagePath}" onerror="this.src='https://placehold.co/400x250?text=No+Image'">
                    <span class="badge">${displayCategory}</span>
                    <button class="zoom-btn"><i class="fas fa-expand"></i></button>
                </div>
                <div class="card-content">
                    <div class="card-header-row">
                        <h3>${event.eventName}</h3>
                        <div class="header-icons">
                            <a href="${event.brochurePath}" download class="brochure-icon" target="_blank"><i class="fas fa-file-pdf"></i></a>
                            ${sdgBadgeHTML} 
                        </div>
                    </div>
                    ${sharedDetailsHTML}
                    <div class="card-actions">
                        <button class="register-btn">Register Now</button>
                        <button class="calendar-btn" data-url="${calendarUrl}"><i class="far fa-calendar-plus"></i> Add to Calendar</button>
                    </div>
                </div>
            </div>
        `;

        const backHTML = hasVolunteers ? `
            <div class="card-back">
                <div class="card-image">
                    <button class="delete-btn" title="Delete Event"><i class="fas fa-trash-alt"></i></button>
                    <button class="edit-btn" title="Edit Event"><i class="fas fa-edit"></i></button>
                    ${flipBtnHTML}
                    <img src="${event.volunteerBannerPath}" onerror="this.src='https://placehold.co/400x250?text=No+Image'">
                    <span class="badge volunteer-badge">Volunteer View</span>
                    <button class="zoom-btn"><i class="fas fa-expand"></i></button>
                </div>
                <div class="card-content">
                    <div class="card-header-row">
                        <h3>${event.eventName}</h3>
                        <div class="header-icons">
                            <a href="${event.volunteerBrochurePath}" download class="brochure-icon" target="_blank"><i class="fas fa-file-pdf"></i></a>
                            ${sdgBadgeHTML}
                        </div>
                    </div>
                    ${sharedDetailsHTML}            
                    <div class="card-actions">
                        <button class="register-btn volunteer-btn">Apply as Volunteer</button>
                        <button class="calendar-btn" data-url="${calendarUrl}"><i class="far fa-calendar-plus"></i> Add to Calendar</button>
                    </div>
                </div>
            </div>
        ` : '';

        card.innerHTML = frontHTML + backHTML;
        flipWrapper.appendChild(card);

        // --- ATTACH EVENT LISTENERS ---
        
        // Delete
        flipWrapper.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); e.stopPropagation();
                if (confirm(`Are you sure you want to delete "${event.eventName}"?`)) {
                    demoEvents = demoEvents.filter(ev => ev._id !== event._id); // Update Array
                    flipWrapper.style.transition = "all 0.4s ease";
                    flipWrapper.style.opacity = "0";
                    flipWrapper.style.transform = "scale(0.9)";
                    setTimeout(() => { flipWrapper.remove(); checkEmptyGrid(); }, 400); // Update DOM
                }
            });
        });

        // Edit
        flipWrapper.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); e.stopPropagation();
                document.getElementById('editStaticId').value = event._id;
                document.getElementById('editStaticName').value = event.eventName;
                document.getElementById('editStaticOrg').value = event.organizationName;
                if(staticEditModal) staticEditModal.style.display = 'flex';
            });
        });

        // Zoom & Calendar
        flipWrapper.querySelectorAll('.zoom-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const img = btn.closest('.card-image').querySelector('img');
                if (imageModal && modalImg) { 
                    imageModal.style.display = "block"; 
                    modalImg.src = img.src; 
                    if(captionText) captionText.innerHTML = event.eventName; 
                }
            });
        });
        flipWrapper.querySelectorAll('.calendar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); window.open(btn.getAttribute('data-url'), '_blank'); });
        });

        // SDG Badge Click
        flipWrapper.querySelectorAll('.certificate-icon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); e.preventDefault();
                const score = parseInt(btn.getAttribute('data-score'), 10);
                const title = document.getElementById('sdgModalTitle');
                const message = document.getElementById('sdgModalMessage');
                const icon = document.getElementById('sdgModalIcon');

                if (score >= 100) {
                    title.innerText = "SDG Badge Awarded! ";
                    title.style.color = "#f59e0b";
                    icon.className = "fas fa-award active-modal-badge";
                    message.innerText = `Congratulations! This event has achieved an outstanding SDG Score of ${score}.`;
                } else {
                    title.innerText = "SDG Badge Status";
                    title.style.color = "#718096";
                    icon.className = "fas fa-certificate inactive-modal-badge";
                    message.innerText = `This event has an SDG Score of ${score}. It requires 100+ points to qualify.`;
                }
                if(sdgModal) sdgModal.style.display = "flex";
            });
        });

        // Flip
        if (hasVolunteers) {
            flipWrapper.querySelectorAll('.flip-btn').forEach(btn => {
                btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); card.classList.toggle('flipped'); });
            });
        }

        // Full Card Click
        flipWrapper.addEventListener('click', (e) => {
            if (e.target.closest('button, a, .delete-btn, .edit-btn, .flip-btn, .zoom-btn, .brochure-icon')) return;
            const viewMode = card.classList.contains('flipped') ? 'volunteer' : 'attendee';
            window.open(`./Event-card-click(2).html?id=${event._id}&source=create-event&view=${viewMode}`, '_blank');
        });

        return flipWrapper;
    };

    // =========================================
    // 5. EDIT FORM SUBMISSION
    // =========================================
    const staticEditForm = document.getElementById('staticEditForm');
    if (staticEditForm) {
        staticEditForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('editStaticId').value;
            const newName = document.getElementById('editStaticName').value;
            const newOrg = document.getElementById('editStaticOrg').value;

            // Find and update the object in the array
            const index = demoEvents.findIndex(ev => ev._id === id);
            if (index > -1) {
                demoEvents[index].eventName = newName;
                demoEvents[index].organizationName = newOrg;
            }
            
            if (staticEditModal) staticEditModal.style.display = 'none';
            renderAllCards(); // Re-render the UI with the updated array
        });
    }

    // =========================================
    // 6. INITIAL RENDER
    // =========================================
    const renderAllCards = () => {
        if (!createdEventsGrid) return;
        createdEventsGrid.innerHTML = ''; // Clear grid
        demoEvents.forEach(event => {
            createdEventsGrid.appendChild(createEventCard(event)); // Rebuild grid
        });
        checkEmptyGrid();
    };

    // Kickoff
    renderAllCards();
});

