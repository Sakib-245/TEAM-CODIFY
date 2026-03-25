document.addEventListener('DOMContentLoaded', () => {
    const communityGrid = document.getElementById('communityGrid');
    const searchInput = document.getElementById('communitySearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');

    // MOCK DATA
    const communityData = [
        {
            type: 'review',
            eventName: "Street Food Carnival",
            reviewerName: "John Doe",
            email: "johndoe@example.com", // <-- Optional email added here
            dateAttended: "10/28/2023",
            rating: 5,
            content: "The “Street Food Carnival” was an outstanding experience, offering a vibrant atmosphere and an incredible variety of delicious cuisines. The event was well-organized, with clean stalls, friendly vendors, and great crowd management. Live music and engaging activities added to the overall enjoyment. A perfect 5/5 event that truly celebrated food and community spirit!Flawless organization and great music! The setup was amazing. Flawless organization and great music!Flawless organization and great music! The setup was amazing. Flawless organization and great music!Flawless organization and great music! The setup was amazing. Flawless organization and great music!Flawless organization and great music! The setup was amazing. Flawless organization and great music!Flawless organization and great music! The setup was amazing. Flawless organization and great music!Flawless organization and great music! The setup was amazing. Flawless organization and great music!Flawless organization and great music! The setup was amazing. Flawless organization and great music!Flawless organization and great music! The setup was amazing. Flawless organization and great music!Flawless organization and great music! The setup was amazing. Flawless organization and great music!Flawless organization and great music! The setup was amazing. Flawless organization and great music!Flawless organization and great music! The setup was amazing. Flawless organization and great music!",
            images: ["Images/Streetfood-1.jpeg", "Images/Streetfood-2.jpeg","Images/Streetfood-3.jpeg"] 
        },
        {
            type: 'report',
            category: "Other",               
            otherCategory: "Noise Violation",
            eventName: "Summer Jazz Festival",
            email: "john@example.com",
            incidentDateTime: "03/20/2026 | 11:45 PM",
            content: "The event titled “Summer Jazz Festival” resulted in significant noise violations, causing disturbance to nearby residents and the surrounding environment. Loud music and amplified sound systems continued well beyond the permissible hours, exceeding acceptable noise limits. The disturbance affected public peace, particularly impacting elderly individuals, children, and those requiring a quiet environment. Despite regulations in place, proper noise control measures were not adequately followed by the organizers. This incident highlights the need for stricter monitoring and adherence to noise pollution guidelines during such events. Appropriate actions and preventive measures should be implemented to avoid recurrence in the future.",
            images: ["Images/Lautnoise-1.jpeg","Images/Lautnoise-2.jpeg","Images/Concert-img.jpeg"]       
        }
    ];
   
    function renderCards(filter = 'all', search = '') {
        communityGrid.innerHTML = '';
        let visibleCount = 0;

        communityData.forEach(item => {
            const matchesFilter = filter === 'all' || item.type === filter;
            const matchesSearch = item.eventName.toLowerCase().includes(search.toLowerCase());

            if (matchesFilter && matchesSearch) {
                const card = item.type === 'review' ? createReviewCard(item) : createReportCard(item);
                communityGrid.insertAdjacentHTML('beforeend', card);
                visibleCount++;
            }
        });
        noResults.classList.toggle('hidden', visibleCount > 0);
        checkTextOverflow();
    }

    // Helper Function: Generate Stars for Reviews
    function generateStarMarkup(rating) {
        let stars = "";
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }
        return stars;
    }

    // Helper Function: Create Review Card
   // Helper Function: Create Review Card
    // Update createReviewCard as well to include the scroll gallery class
function createReviewCard(item) {
    const starHTML = generateStarMarkup(item.rating || 5);
    
    let imageMarkup = '';
    if (item.images && item.images.length > 0) {
        imageMarkup = `<div class="evidence-gallery mobile-scroll-gallery">` + 
            item.images.map(img => `<img src="${img}" class="review-image-placeholder clickable-img">`).join('') + 
            `</div>`;
    }

    const initial = item.reviewerName ? item.reviewerName.charAt(0).toUpperCase() : 'U';
    const dateStr = item.dateAttended ? `<span class="review-date">Attended: ${item.dateAttended}</span>` : '';
    const emailMarkup = item.email ? `<span class="reviewer-email"><i class="fas fa-envelope"></i> ${item.email}</span>` : '';

    return `
        <div class="review-card">
            <div class="review-card-header">
                <div class="profile-avatar">${initial}</div>
                <div class="header-info">
                    <p class="reviewer-name">${item.reviewerName || 'Anonymous'}</p>
                    <span class="service-name">${item.eventName}</span>
                </div>
            </div>
            <div class="review-meta-bar">
                <div class="stars">${starHTML}</div>
                ${dateStr}
                ${emailMarkup}
            </div>
            <div class="review-card-body">
                <p class="review-comment content-clamped">${item.content}</p>
                <button class="read-more-btn" onclick="toggleReadMore(this)">Read More</button>
                ${imageMarkup}
            </div>
        </div>
    `;
}

    // Helper Function: Create Report Card
    function createReportCard(item) {
    const displayCategory = (item.category === "Other" && item.otherCategory) ? item.otherCategory : (item.category || 'General Concern');
    
    let evidenceMarkup = '';
    if (item.images && item.images.length > 0) {
        // Added 'mobile-scroll-gallery' class for the horizontal scroll feature
        evidenceMarkup = `<div class="evidence-gallery mobile-scroll-gallery">` + 
            item.images.map(img => `<img src="${img}" class="evidence-img clickable-img">`).join('') + 
            `</div>`;
    }

    const emailMarkup = item.email ? `<span class="report-email"><i class="fas fa-envelope"></i> ${item.email}</span>` : '';

    return `
        <div class="report-card">
            <span class="report-badge">${displayCategory}</span>
            <div class="report-header">
                <h3 class="report-title">${item.eventName || 'Reported Event'}</h3>
            </div>
            <div class="report-meta-bar">
                <span><i class="far fa-calendar-alt"></i> ${item.incidentDateTime || 'Recent'}</span>
                ${emailMarkup}
            </div>
            <div class="report-body">
                <p class="report-description content-clamped">${item.content}</p>
                <button class="read-more-btn" onclick="toggleReadMore(this)">Read More</button>
            </div>
            ${evidenceMarkup}
        </div>`;
}

    // Filter Buttons logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCards(btn.dataset.filter, searchInput.value);
        });
    });

    // Search logic
    searchInput.addEventListener('input', () => {
        renderCards(document.querySelector('.filter-btn.active').dataset.filter, searchInput.value);
    });

    // Initial Load
    renderCards(); 
});


// Function to show "Read More" only if the text actually exceeds 3 lines
function checkTextOverflow() {
    const clampedElements = document.querySelectorAll('.content-clamped');
    clampedElements.forEach(el => {
        const btn = el.nextElementSibling; // The read more button
        // If the scroll height is greater than the client height, text is clamped!
        if (el.scrollHeight > el.clientHeight) {
            btn.style.display = 'inline-block';
        } else {
            btn.style.display = 'none';
        }
    });
}

// Global function to toggle the text clamping when the button is clicked
window.toggleReadMore = function(btn) {
    const content = btn.previousElementSibling;
    content.classList.toggle('content-clamped');
    
    if (content.classList.contains('content-clamped')) {
        btn.textContent = 'Read More';
    } else {
        btn.textContent = 'Read Less';
    }
};


// =========================================
// LIGHTBOX (FULL SCREEN IMAGE) LOGIC
// =========================================
const imageModal = document.getElementById("imageModal");
const fullImage = document.getElementById("fullImage");
const closeModal = document.querySelector(".close-modal");

// Listen for clicks on the grid. If it's an image, open the modal!
document.getElementById('communityGrid').addEventListener('click', function(e) {
    if (e.target.classList.contains('clickable-img')) {
        imageModal.style.display = "flex"; // Use flex to center the image
        fullImage.src = e.target.src;      // Set the modal image to the clicked image
        document.body.style.overflow = "hidden"; // Prevent scrolling the background page
    }
});

// Close modal when clicking the 'X'
closeModal.addEventListener('click', closeImageModal);

// Close modal when clicking anywhere outside the image (on the dark background)
imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
        closeImageModal();
    }
});

function closeImageModal() {
    imageModal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore background scrolling
}



/* --- MOBILE MENU TOGGLE --- */
/* --- MOBILE MENU TOGGLE --- */
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('nav-active'); 
        mobileMenu.classList.toggle('is-active');
    });

    // ADDED: Close menu when any internal link is clicked
    const allLinks = navLinks.querySelectorAll('a');
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            mobileMenu.classList.remove('is-active');
        });
    });
}

// Close menu when clicking outside or on a link
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('nav-active')) {
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
            navLinks.classList.remove('nav-active');
            mobileMenu.classList.remove('is-active');
        }
    }
});



/* --- AUTO-CLOSE MENU ON LINK CLICK --- */
const navLinksItems = document.querySelectorAll('.nav-links a');

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        // Check if we are in mobile view before forcing close
        if (window.innerWidth <= 768) {
            const navContainer = document.querySelector('.nav-links');
            const menuToggle = document.getElementById('mobile-menu');
            
            if (navContainer && menuToggle) {
                navContainer.classList.remove('nav-active');
                menuToggle.classList.remove('is-active');
            }
        }
    });
});