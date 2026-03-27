document.addEventListener('DOMContentLoaded', async () => {
    const mapElement = document.getElementById('googleMap');
    const statusBox = document.getElementById('mapStatus');
    const eventGrid = document.getElementById('nearbyEventsGrid');
    const searchInput = document.getElementById('nearbySearchInput');
    const noResultsMsg = document.getElementById('noResults');

    let map;
    let userLocation = null;
    let nearbyEvents = [];
    const MAX_DISTANCE_KM = 50; 

// STATIC DEMO DATA (Updated with varied locations, dates, and contact info)
    const demoEvents = [
        // ==========================================
        // CATEGORY 1: Blood Donation Camps
        // ==========================================
        {
            eventName: "City Blood Drive",
            category: "Blood Donation Camp",
            organizationName: "Red Cross Pune",
            date: "2026-04-15",
            time: "10:00",
            address: "Sanjeevan Hospital, Karve Nagar",
            city: "Pune",
            lat: 18.4900,
            lng: 73.8200,
            imagePath: "../assets/images/blood_1.jpeg",
            googleFormLink: "#",
            organizerEmail: "donate@redcross.in",
            mobileNumber: "+91 90000 10000"
        },
        {
            eventName: "Lifesavers Mega Camp",
            category: "Blood Donation Camp",
            organizationName: "Rotary Club Kothrud",
            date: "2026-04-18",
            time: "09:30",
            address: "Yashwantrao Chavan Natyagruha, Kothrud",
            city: "Pune",
            lat: 18.5074,
            lng: 73.8077,
            imagePath: "../assets/images/blood_2.jpeg",
            googleFormLink: "#",
            organizerEmail: "kothrud@rotarypune.org",
            mobileNumber: "+91 98230 44556"
        },
        {
            eventName: "Youth Blood Donation",
            category: "Blood Donation Camp",
            organizationName: "NSS Pune University",
            date: "2026-05-02",
            time: "11:00",
            address: "SPPU Main Building, Ganeshkhind",
            city: "Pune",
            lat: 18.5534,
            lng: 73.8270,
            imagePath: "../assets/images/blood_3.jpeg",
            googleFormLink: "#",
            organizerEmail: "nss@unipune.ac.in",
            mobileNumber: "+91 77382 99112"
        },
        {
            eventName: "IT Park Blood Drive",
            category: "Blood Donation Camp",
            organizationName: "Hinjewadi Welfare Assoc",
            date: "2026-05-10",
            time: "10:00",
            address: "Phase 1 Quadron Business Park, Hinjewadi",
            city: "Pune",
            lat: 18.5888,
            lng: 73.7371,
            imagePath: "../assets/images/blood_4.jpeg",
            googleFormLink: "#",
            organizerEmail: "welfare@hinjewadi-it.com",
            mobileNumber: "+91 88002 33445"
        },

        // ==========================================
        // CATEGORY 2: Vaccine Camps
        // ==========================================
        {
            eventName: "Booster Vaccine Camp",
            category: "Vaccine Camp",
            organizationName: "PMC Health Dept",
            date: "2026-04-20",
            time: "09:00",
            address: "PMC Ward Office, Shivajinagar",
            city: "Pune",
            lat: 18.5314,
            lng: 73.8446,
            imagePath: "../assets/images/vaccine_1.jpeg",
            googleFormLink: "#",
            organizerEmail: "vax@punecity.gov",
            mobileNumber: "+91 80000 20000"
        },
        {
            eventName: "Flu Shot Drive 2026",
            category: "Vaccine Camp",
            organizationName: "Sahyadri Hospitals",
            date: "2026-04-25",
            time: "10:30",
            address: "Sahyadri Hospital, Deccan Gymkhana",
            city: "Pune",
            lat: 18.5150,
            lng: 73.8400,
            imagePath: "../assets/images/vaccine_2.jpeg",
            googleFormLink: "#",
            organizerEmail: "camps@sahyadrihospitals.com",
            mobileNumber: "+91 91234 56789"
        },
        {
            eventName: "Child Immunization Fair",
            category: "Vaccine Camp",
            organizationName: "Surya Mother & Child Care",
            date: "2026-05-05",
            time: "08:30",
            address: "Wakad Road, Wakad",
            city: "Pune",
            lat: 18.5994,
            lng: 73.7626,
            imagePath: "../assets/images/vaccine_3.jpeg",
            googleFormLink: "#",
            organizerEmail: "pediatrics@suryacare.in",
            mobileNumber: "+91 98888 12345"
        },
        {
            eventName: "Senior Citizen Vax Drive",
            category: "Vaccine Camp",
            organizationName: "Ruby Hall Clinic",
            date: "2026-05-12",
            time: "11:00",
            address: "Ruby Hall, Dhole Patil Road",
            city: "Pune",
            lat: 18.5350,
            lng: 73.8820,
            imagePath: "../assets/images/vaccine_4.jpeg",
            googleFormLink: "#",
            organizerEmail: "community@rubyhall.com",
            mobileNumber: "+91 70300 45678"
        },

        // ==========================================
        // CATEGORY 3: Women Only Events
        // ==========================================
        {
            eventName: "Women in Tech Meetup",
            category: "Women Only Events",
            organizationName: "Pune Women Coders",
            date: "2026-04-22",
            time: "16:00",
            address: "WeWork, Magarpatta City",
            city: "Pune",
            lat: 18.5157,
            lng: 73.9275,
            imagePath: "../assets/images/Women_1.jpeg",
            googleFormLink: "#",
            organizerEmail: "hello@pwc.in",
            mobileNumber: "+91 70000 30000"
        },
        {
            eventName: "Self-Defense Workshop",
            category: "Women Only Events",
            organizationName: "Nari Shakti Foundation",
            date: "2026-04-28",
            time: "07:00",
            address: "Saras Baug Grounds, Swargate",
            city: "Pune",
            lat: 18.5000,
            lng: 73.8550,
            imagePath: "../assets/images/Women_2.jpeg",
            googleFormLink: "#",
            organizerEmail: "empower@narishakti.org",
            mobileNumber: "+91 99222 11223"
        },
        {
            eventName: "Women's Workshop",
            category: "Women Only Events",
            organizationName: "TiE Pune Women",
            date: "2026-05-08",
            time: "10:00",
            address: "MCCIA Trade Tower, Senapati Bapat Road",
            city: "Pune",
            lat: 18.5332,
            lng: 73.8310,
            imagePath: "../assets/images/Women_3.jpeg",
            googleFormLink: "#",
            organizerEmail: "women@tiepune.org",
            mobileNumber: "+91 80555 66778"
        },
        {
            eventName: "Ladies Marathon",
            category: "Women Only Events",
            organizationName: "Fit Pune Women",
            date: "2026-05-15",
            time: "06:00",
            address: "Balewadi Stadium, Balewadi",
            city: "Pune",
            lat: 18.5750,
            lng: 73.7610,
            imagePath: "../assets/images/Women_4.jpeg",
            googleFormLink: "#",
            organizerEmail: "run@fitpunewomen.in",
            mobileNumber: "+91 94222 33111"
        }
    ];

    // =========================================
    // 1. DATE & TIME HELPERS 
    // =========================================
    const getMonthName = (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date)) return 'Jan';
        const month = date.toLocaleString('default', { month: 'short' }).toLowerCase();
        return month.charAt(0).toUpperCase() + month.slice(1);
    };

    const getDayNumber = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date) ? '01' : String(date.getDate()).padStart(2, '0');
    };

    const getYear = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date) ? '2026' : date.getFullYear();
    };

    const formatTime12Hour = (timeStr) => {
        if (!timeStr) return 'TBD';
        let [hours, minutes] = timeStr.split(':');
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${String(h12).padStart(2, '0')}:${minutes} ${ampm}`;
    };


// =========================================
    // 2. GOOGLE MAPS & GEOLOCATION (UPDATED)
    // =========================================
    // Read cached coordinates from the previous page's modal workflow

    // =========================================
    // MAP INITIALIZATION & ERROR HANDLING
    // =========================================
    function initMap(lat, lng) {
        // 1. Set the global userLocation variable
        userLocation = { lat: lat, lng: lng };

        // 2. Render the Google Map
        map = new google.maps.Map(mapElement, {
            center: userLocation,
            zoom: 12,
            // Re-enabling the default UI controls
            mapTypeControl: true,    // Restores Map/Satellite toggle
            streetViewControl: true, // Restores the Street View pegman
            zoomControl: true,       // Restores the +/- navigation panel
            fullscreenControl: true  // Optional: Allows users to expand the map
        });

        // 3. Drop a custom marker for the User's Current Location
        new google.maps.Marker({
            position: userLocation,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#2b6cb0',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
            },
            title: "Your Location",
            zIndex: 999
        });

        // 4. Now that the map and location are ready, process the events
        processStaticEvents();
    }

    function handleLocationError(browserHasGeolocation) {
        // Update the status box with an error message
        statusBox.innerHTML = browserHasGeolocation 
            ? '<i class="fas fa-exclamation-triangle"></i> Location access denied or timed out.' 
            : '<i class="fas fa-exclamation-triangle"></i> Error: Your browser doesn\'t support geolocation.';
        
        statusBox.style.color = "#e53e3e"; // Red error text
        
        // Fallback: Initialize map to default city center (Pune) so the page doesn't entirely break
        console.warn("Falling back to default location (Pune).");
        initMap(18.5204, 73.8567); 
    }

    const cachedLat = sessionStorage.getItem('cachedLat');
    const cachedLng = sessionStorage.getItem('cachedLng');

    if (cachedLat && cachedLng) {
        // Fast-track map initialization if permission was already granted and cached
        initMap(parseFloat(cachedLat), parseFloat(cachedLng));
    } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                initMap(position.coords.latitude, position.coords.longitude);
            },
            () => {
                handleLocationError(true);
            }
        );
    } else {
        handleLocationError(false);
    }

    // =========================================
    // 3. EVENT PROCESSING & DISTANCE CALC (UPDATED)
    // =========================================
    function processStaticEvents() {
        nearbyEvents = [];
        
        // Read intent from URL or Session Storage
        const urlParams = new URLSearchParams(window.location.search);
        const selectedType = urlParams.get('type') || sessionStorage.getItem('selectedNearbyType');

        // Dynamically update the header text
        if (selectedType) {
            const headerTitle = document.querySelector('.filter-section h1');
            if (headerTitle) headerTitle.textContent = `${selectedType}s Near You`;
        }

        demoEvents.forEach(event => {
            // Apply Intent Filter first
            if (selectedType && event.category !== selectedType) {
                return; // Skip events that don't match the selected type
            }

            const eventLatLng = new google.maps.LatLng(event.lat, event.lng);
            const distanceMeters = google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(userLocation.lat, userLocation.lng),
                eventLatLng
            );
            
            const distanceKm = distanceMeters / 1000;

            if (distanceKm <= MAX_DISTANCE_KM) {
                event.distance = distanceKm;
                nearbyEvents.push(event);
                
                const marker = new google.maps.Marker({
                    map: map,
                    position: eventLatLng,
                    title: event.eventName,
                    animation: google.maps.Animation.DROP
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `<strong>${event.eventName}</strong><br>${distanceKm.toFixed(1)} km away`
                });

                marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                });
            }
        });

        statusBox.classList.add('hidden');
        renderEventCards(nearbyEvents);
    }

    // =========================================
    // 4. CARD RENDERING & INTERACTIONS
    // =========================================
    function renderEventCards(eventsToRender) {
        eventGrid.innerHTML = '';
        
        if (eventsToRender.length === 0) {
            noResultsMsg.style.display = 'block';
            noResultsMsg.classList.remove('hidden');
            return;
        }

        noResultsMsg.style.display = 'none';
        noResultsMsg.classList.add('hidden');

        eventsToRender.forEach(event => {
            const card = document.createElement('div');
            card.className = 'event-card dynamic-card';
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="${event.imagePath}" alt="${event.eventName}" onerror="this.src='https://via.placeholder.com/400x200?text=Event+Image'">
                    <span class="badge" style="text-transform: none;">${event.category}</span>
                </div>
                <div class="card-content">
                    <div class="card-header-row">
                        <h3>${event.eventName}</h3>
                        <span class="distance-badge" style="font-size: 0.8rem; color: #e74c3c; font-weight: 600; margin-top: 5px;">
                            <i class="fas fa-location-arrow"></i> ${(event.distance || 0).toFixed(1)} km
                        </span>
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
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address + ' ' + event.city)}" target="_blank">${event.address}, ${event.city}</a>
                    </div>
                    
                    <div class="card-actions">
                        <button class="register-btn db-register-btn" data-link="${event.googleFormLink}">Register</button>
                        <button class="calendar-btn db-calendar-btn">
                            <i class="far fa-calendar-plus"></i> Add to Calendar
                        </button>
                    </div>
                </div>
            `;

            // Toggling Register Button Logic
            const regBtn = card.querySelector('.db-register-btn');
            regBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); 
                
                if (this.classList.contains('is-registered-state')) {
                    this.classList.remove('is-registered-state');
                    this.textContent = "Register";
                    this.style.backgroundColor = "#32CD32";
                    this.style.color = "#fff";
                } else {
                    this.classList.add('is-registered-state');
                    this.textContent = "Registered";
                    this.style.backgroundColor = "#6c757d";
                    this.style.color = "#fff";
                    
                    const link = this.getAttribute('data-link');
                    if (link && link !== '#') {
                        window.open(link, '_blank');
                    }
                }
            });

            // Toggling Calendar Button Logic (Visual Only)
            const calBtn = card.querySelector('.db-calendar-btn');
            calBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                if (this.classList.contains('is-added-state')) {
                    this.classList.remove('is-added-state');
                    this.innerHTML = '<i class="far fa-calendar-plus"></i> Add to Calendar';
                    this.style.backgroundColor = "#fff"; 
                    this.style.color = "#555";
                    this.style.borderColor = "#ccc";
                } else {
                    this.classList.add('is-added-state');
                    this.innerHTML = '<i class="fas fa-check"></i> Added';
                    this.style.backgroundColor = "#27ae60"; 
                    this.style.color = "#fff";
                    this.style.borderColor = "#27ae60";
                }
            });

            eventGrid.appendChild(card);
        });
    }

    // =========================================
    // 5. SEARCH FILTERING
    // =========================================
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const filtered = nearbyEvents.filter(ev => {
                const nameMatch = ev.eventName.toLowerCase().includes(term);
                const catMatch = ev.category.toLowerCase().includes(term);
                return nameMatch || catMatch;
            });
            renderEventCards(filtered);
        });
    }
});


