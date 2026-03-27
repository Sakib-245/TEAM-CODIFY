// 1. PLACE THIS AT THE VERY TOP OF YOUR FILE
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    console.log("Hamburger clicked!"); // Check your browser console (F12) to see this
    
    if (navLinks) {
        navLinks.classList.toggle('nav-active');
    }
}

// ... rest of your existing document.addEventListener("DOMContentLoaded"...) code ...



document.addEventListener("DOMContentLoaded", function() {
    const eventText = document.getElementById('eventText');
    const container = document.getElementById('eventTextContainer');

    // Function to check if text is overflowing 3 lines
    function checkOverflow() {
        // Compare the scroll height (total height) with client height (visible height)
        if (eventText.scrollHeight > eventText.clientHeight) {
            // Create the Read more button dynamically
            const btn = document.createElement('a');
            btn.className = 'toggle-link';
            btn.textContent = 'read more';
            btn.href = 'javascript:void(0)';
            
            container.appendChild(btn);

            btn.addEventListener('click', function() {
                if (eventText.classList.contains('collapsed')) {
                    // Expand
                    eventText.classList.replace('collapsed', 'expanded');
                    this.textContent = ' read less';
                    // Move the button to the end of the text
                    eventText.appendChild(this);
                } else {
                    // Collapse
                    eventText.classList.replace('expanded', 'collapsed');
                    this.textContent = 'read more';
                    // Move the button back below the text
                    container.appendChild(this);
                }
            });
        }
    }

    // Run the check
    checkOverflow();
});




document.addEventListener("DOMContentLoaded", function() {
    const eventText = document.getElementById('eventText');
    const container = document.getElementById('eventTextContainer');

    function checkOverflow() {
        // Clear existing buttons to prevent duplicates on re-run
        const existingBtn = container.querySelector('.toggle-link');
        if (existingBtn) existingBtn.remove();

        // Check if content exceeds 3 lines
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

    // Run initial check
    checkOverflow();

    // Re-check if the user resizes the browser
    window.addEventListener('resize', checkOverflow);
});


// for map

// ... Your existing Bookmark and Registration logic ...

// Location Map Logic
const showMapBtn = document.getElementById('showMapBtn');

showMapBtn.addEventListener('click', function() {
    // URL for Google Maps location of "Ideas to Impacts Baner Pune"
    const googleMapsUrl = 'https://www.google.com/maps/place/Ideas+to+Impacts+Pune,+MH';
    
    // Open Google Maps in a new browser tab/window
    window.open(googleMapsUrl, '_blank');
});








// dashboard

document.addEventListener("DOMContentLoaded", function() {
    // Random figures data
    const stats = {
        totalRegistrations: Math.floor(Math.random() * 500) + 100,
        totalViews: Math.floor(Math.random() * 5000) + 22000,
        monthlyReg: Math.floor(Math.random() * 100) + 550,
        totalEvents: Math.floor(Math.random() * 10) + 4,
        totalVolunteers: Math.floor(Math.random() * 50) + 115
    };

    // Function to animate the numbers
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Trigger animations
    animateValue("totalRegistrations", 0, stats.totalRegistrations, 1500);
    animateValue("totalViews", 0, stats.totalViews, 1500);
    animateValue("monthlyReg", 0, stats.monthlyReg, 1500);
    animateValue("totalEvents", 0, stats.totalEvents, 1500);
    animateValue("totalVolunteers", 0, stats.totalVolunteers, 1500);
});


// graph

document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('weeklyRegistrationChart').getContext('2d');
    
    // Labels for the last 7 days
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const labels = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        labels.push(days[d.getDay()]);
    }

    // Random registration figures
    const registrationData = labels.map(() => Math.floor(Math.random() * 50) + 10);

    new Chart(ctx, {
        type: 'bar', // Changed from 'line' to 'bar'
        data: {
            labels: labels,
            datasets: [{
                label: 'New Registrations',
                data: registrationData,
                backgroundColor: '#3d64ff', // Solid blue color matching your UI
                borderColor: '#2a4ecc',
                borderWidth: 1,
                borderRadius: 5, // Adds rounded corners to bars
                hoverBackgroundColor: '#2a4ecc'
            }]
        },
        options: {
           responsive: true,
    maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f0f0f0' },
                    ticks: { 
                        color: '#6f7287',
                        stepSize: 10 
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#6f7287' }
                }
            }
        }
    });
});





// Existing Bookmark and Register logic...

// PDF Icon Logic
const pdfBtn = document.getElementById('pdfBtn');
if(pdfBtn) {
    pdfBtn.addEventListener('click', function() {
        // This triggers the browser's print dialog, which allows saving as PDF
        window.print();
    });
}


// volunteer buttton
const volunteerBtn = document.getElementById('volunteerBtn');

volunteerBtn.addEventListener('click', function() {
    // 1. Change the text
    this.textContent = 'Applied';
    
    // 2. Add the grey class
    this.classList.add('applied');
    
    // 3. Optional: Disable the button so it can't be clicked again
    this.disabled = true;
});




document.addEventListener("DOMContentLoaded", function() {
    const bookmarkBtn = document.getElementById('bookmarkBtn');

    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function() {
            // Toggles the 'active' class which handles the color change
            this.classList.toggle('active');
            
            // Optional: Changes the icon from regular to solid if using FontAwesome
            if (this.classList.contains('active')) {
                this.classList.replace('fa-regular', 'fa-solid');
                console.log("Event bookmarked");
            } else {
                this.classList.replace('fa-solid', 'fa-regular');
                console.log("Bookmark removed");
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const registerBtn = document.getElementById('registerBtn');

    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            // 1. Change the text to show completion
            this.textContent = 'Registered';
            
            // 2. Add the 'registered' class to trigger the grey background
            this.classList.add('registered');
            
            // 3. Disable the button to prevent multiple clicks
            this.disabled = true;
            
            console.log("User successfully registered for the event.");
        });
    }
});


document.addEventListener("DOMContentLoaded", function() {
    // ... your other code (Read more, Charts, etc.) ...

    // AUTO-CLOSE MOBILE MENU
    const navLinksContainer = document.querySelector('.nav-links');
    const allNavLinks = document.querySelectorAll('.nav-links a');

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // This removes the 'nav-active' class, hiding the menu
            if (navLinksContainer.classList.contains('nav-active')) {
                navLinksContainer.classList.remove('nav-active');
            }
        });
    });
});

