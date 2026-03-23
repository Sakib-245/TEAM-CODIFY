document.addEventListener('DOMContentLoaded', () => {

   /* ==================================================================
   1. NAVBAR TOGGLE 
   ================================================================== */
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a'); // Select all links

if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
        // Toggle the menu open/close
        navLinks.classList.toggle('nav-active');
        mobileMenu.classList.toggle('is-active');
        e.stopPropagation(); 
    });
}

// NEW: Close the menu when any link inside it is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // If the menu is open, close it
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            mobileMenu.classList.remove('is-active'); // Reset hamburger icon
        }
    });
});

// Close menu when clicking outside (Keep this existing part)
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('nav-active')) {
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
            navLinks.classList.remove('nav-active');
            mobileMenu.classList.remove('is-active');
        }
    }
});
    /* ==================================================================
       2. FAQ ACCORDION
       ================================================================== */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                // Close others
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                // Toggle current
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = null;
                }
            });
        }
    });

    /* ==================================================================
       3. CREATE EVENT LOGIC
       ================================================================== */
    const modal = document.getElementById('eventModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('createEventForm');
    const grid = document.getElementById('createdEventsGrid');
    const noResultsMsg = document.getElementById('noResults');

    // Load Events from LocalStorage on page load
    let createdEvents = JSON.parse(localStorage.getItem('myEvents')) || [];
    renderEvents();

    // Open Modal
    if(openBtn) {
        openBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    // Close Modal
    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close Modal on Click Outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle Form Submission
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get Values from Inputs
            const title = document.getElementById('evTitle').value;
            const org = document.getElementById('evOrg').value;
            const category = document.getElementById('evCategory').value;
            const date = document.getElementById('evDate').value;
            const location = document.getElementById('evLocation').value;

            // Create Object
            const newEvent = {
                id: Date.now(),
                title: title,
                org: org,
                category: category,
                date: date,
                location: location,
                // Placeholder image since we don't have file upload logic
                image: 'https://via.placeholder.com/400x200?text=Event+Image' 
            };

            // Add to array & Save
            createdEvents.push(newEvent);
            localStorage.setItem('myEvents', JSON.stringify(createdEvents));

            // Refresh Grid & Close
            renderEvents();
            form.reset();
            modal.style.display = 'none';
            alert('Event Created Successfully!');
        });
    }

    // Render Logic
    function renderEvents() {
        grid.innerHTML = '';
        
        if (createdEvents.length === 0) {
            noResultsMsg.classList.remove('hidden');
        } else {
            noResultsMsg.classList.add('hidden');
            
            createdEvents.forEach(evt => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${evt.image}" alt="Event Image">
                        <span class="badge">${evt.category}</span>
                    </div>
                    <div class="card-content">
                        <h3>${evt.title}</h3>
                        <div class="card-org">Organized by: ${evt.org}</div>
                        <p class="date">${evt.date}</p>
                        <div class="card-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${evt.location}</span>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }
  }
});