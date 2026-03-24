document.addEventListener('DOMContentLoaded', () => {
    
    /* =======================================
       1. SIDEBAR NAVIGATION LOGIC
       ======================================= */
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const views = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');

            // Hide all views
            views.forEach(view => view.classList.remove('active'));

            // Show target view
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // "Review All" button in Dashboard routes to Reports View
    const reviewAllBtn = document.getElementById('reviewAllBtn');
    if (reviewAllBtn) {
        reviewAllBtn.addEventListener('click', () => {
            const reportsNavItem = document.querySelector('.nav-item[data-target="reports-view"]');
            if (reportsNavItem) reportsNavItem.click();
        });
    }

    /* =======================================
       2. CHART.JS INITIALIZATION
       ======================================= */
    
    // Doughnut Chart (Event Distribution)
    const ctxDoughnut = document.getElementById('distributionChart');
    if (ctxDoughnut) {
        new Chart(ctxDoughnut, {
            type: 'doughnut',
            data: {
                labels: ['Exhibition', 'NGO/org', 'Health','Education','Student','Marketing','Political','Other'],
                datasets: [{
                    data: [45, 30, 25,22,13,25,6,12],
                    backgroundColor: [
                        '#dd3a25', // Primary Blue
                        '#afc014', // Dark Gray
                        '#3ec81c' , // Gold/Brown 
                        '#0fc271',
                        '#19afaf',
                        '#092c9d',
                        '#4b13e3',
                        '#ea1be0' 
                    ],
                    borderWidth: 0,
                    cutout: '75%' // Creates the thin ring look
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: { size: 12, family: "'Segoe UI', sans-serif" }
                        }
                    }
                }
            },
            // Custom plugin to add text in the center
           plugins: [{
    id: 'textCenter',
    afterDraw: function(chart) {
        const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
        ctx.save();

        // Calculate Center
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;

        // Draw "1.2k" (Main Number)
        ctx.font = "bold 2.5rem sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "#2d3748";
        ctx.fillText("1.2k", centerX, centerY - 10);

        // Draw "TOTAL EVENTS" (Sub-text)
        ctx.font = "600 0.85rem sans-serif";
        ctx.fillStyle = "#718096";
        ctx.fillText("TOTAL EVENTS", centerX, centerY + 20);

        ctx.restore();
    }
}]
        });
    }

    // Bar Chart (User Engagement / Monthly Activity)
    const ctxBar = document.getElementById('engagementChart');
    if (ctxBar) {
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
                datasets: [{
                    label: 'User Activity',
                    data: [15, 20, 45, 80, 50, 60],
                    backgroundColor: '#e2e8f0',
                    borderRadius: 4,
                    hoverBackgroundColor: '#2b6cb0'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { display: false, beginAtZero: true },
                    x: {
                        grid: { display: false, drawBorder: false },
                        ticks: { font: { size: 10, weight: 'bold' }, color: '#a0aec0' }
                    }
                }
            }
        });
    }

/* =======================================
       3. MODERATION EVENT CARDS RENDERER & ZOOM
       ======================================= */
  
    const reportedEvents = [
        {
            id: 1,
            title: "Global Web3 Summit 2024",
            category: "TECH & INNOVATION",
            organizer: "Tech Innovators Network",
            issue: "The contact details provided were incorrect and unreliable, making it difficult for attendees to reach the organizers.",
            image: "Tech.jpeg" 
        },
        {
            id: 2,
            title: "Underground Jazz & Arts",
            category: "ENTERTAINMENT",
            organizer: "Jazz Collective",
            issue: "The event featured controversial content that was inappropriate and unacceptable for the audience.",
            image: "Dj.jpeg" 
        },
        {
            id: 3,
            title: "Community Voices Rally",
            category: "SOCIAL AWARENESS",
            organizer: "City Social Action Group",
            issue: "Inappropriate and offensive image / picture was used, which was unsuitable for the audience.",
            image: "Political.jpeg" 
        },
        {
            id: 4,
            title: "Tech Startup Mixer",
            category: "MARKETING",
            organizer: "Startup Hub Pune",
            issue: "The brochure contained incorrect information along with violent and objectionable content.",
            image: "Startup-Companies-in-Pune.jpg" 
        }
    ];

    const createAdminCard = (event) => {
        const badgeColor = '#f6ad55'; 

        return `
            <div class="event-card" data-id="${event.id}">
                <div class="card-image">
                    <img src="${event.image}" alt="${event.title}" onerror="this.src='https://placehold.co/400x200?text=Image+Not+Found'">
                    <span class="badge" style="background-color: ${badgeColor}; text-transform: uppercase;">${event.category}</span>
                    <button class="zoom-btn"><i class="fas fa-expand"></i></button>
                </div>
                <div class="card-content">
                    <div class="card-header-row">
                        <h3>${event.title}</h3>
                    </div>
                    
                    <div class="card-org">Organized by: <strong>${event.organizer}</strong></div>
                    
                    <div class="card-contact">
                        <h4><i class="fas fa-exclamation-triangle"></i> Reported Issue</h4>
                        <p>${event.issue}</p>
                    </div>

                    <div class="card-actions">
                        <button class="view-btn" onclick="console.log('Viewing details for event ID ${event.id}')">View Details</button>
                        <button class="delete-btn-admin" onclick="console.log('Deleting event ID ${event.id}')">Delete Event</button>
                    </div>
                </div>
            </div>
        `;
    };

    // 1. Populate Grids
    const dashboardGrid = document.getElementById('dashboard-reported-grid');
    if (dashboardGrid) {
        dashboardGrid.innerHTML = reportedEvents.slice(0, 3).map(createAdminCard).join('');
    }

    const reportsGrid = document.getElementById('all-reported-grid');
    if (reportsGrid) {
        reportsGrid.innerHTML = reportedEvents.map(createAdminCard).join('');
    }

    // =========================================
    // ZOOM MODAL LOGIC (Replicated from Find-Events)
    // =========================================
    const imageModal = document.getElementById('imageModal');
    const fullImage = document.getElementById('fullImage');
    const caption = document.getElementById('caption');
    const closeImageBtn = document.querySelector('.close-modal');

    // 2. Attach Listeners directly to elements after rendering
    document.querySelectorAll('.event-card').forEach(card => {
        const zoomBtn = card.querySelector('.zoom-btn');
        if (zoomBtn) {
            zoomBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevents parent clicks
                const img = card.querySelector('.card-image img');
                const title = card.querySelector('h3').textContent;
                
                if (imageModal && fullImage && img) {
                    imageModal.style.display = "block";
                    fullImage.src = img.src;
                    caption.textContent = title;
                }
            });
        }
    });

    // 3. Modal Close Logic
    if (closeImageBtn) {
        closeImageBtn.addEventListener('click', () => { 
            if (imageModal) imageModal.style.display = "none"; 
        });
    }

    window.addEventListener('click', (e) => { 
        if (e.target === imageModal) {
            imageModal.style.display = "none"; 
        }
    });
    
});