document.addEventListener('DOMContentLoaded', async() => {

    async function initializeUserContext() {
    try {
        const response = await fetch('/api/users/me');
        
        // Handle unauthenticated users gracefully
        if (response.status === 401 || response.status === 403) {
            document.getElementById('navCreditsBadge').style.display = 'none';
            return;
        }

        if (response.ok) {
            const userData = await response.json();
            
            // 1. Update SDG Gamification Badge
            const badge = document.getElementById('navCreditsBadge');
            const creditsEl = document.getElementById('navTotalCredits');
            if (badge && creditsEl) {
                badge.style.display = 'inline-flex'; 
                creditsEl.textContent = userData.totalCredits || 0;
            }

            // 2. Format Welcome Banner to match database username exactly
            const welcomeHeader = document.querySelector('header.sticky-header .welcome-banner');
            if (welcomeHeader && userData.username) {
                welcomeHeader.innerHTML = `Welcome, ${userData.username}`;
            }
        }
    } catch (error) {
        console.error('Failed to fetch user context:', error);
    }
}

// Call immediately on load
initializeUserContext();

// Global map variables
let map, marker, autocomplete;

// --- 1. Initialize Google Map & Autocomplete ---
function initMap() {
    // Default location (e.g., Pune, India)
    const defaultLoc = { lat: 18.5204, lng: 73.8567 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: defaultLoc,
        mapTypeControl: false, 
        streetViewControl: false
    });

    marker = new google.maps.Marker({
        position: defaultLoc,
        map: map,
        draggable: true
    });

    // Search bar inside map
    const input = document.getElementById("pac-input");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    // Setup Autocomplete on the MAP INPUT
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);

    // Event: Place Changed
    autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            alert("No details available for input: '" + place.name + "'");
            return;
        }

        // Center map and move marker
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setPosition(place.geometry.location);

        fillAddressDetails(place);
    });

    // Event: Marker Dragged
    marker.addListener("dragend", () => {
        const position = marker.getPosition();
        geocodePosition(position);
    });

    // Event: Map Clicked
    map.addListener("click", (e) => {
        marker.setPosition(e.latLng);
        geocodePosition(e.latLng);
    });
}

window.initMap = initMap;

// Reverse Geocoding (Lat/Lng -> Address)
function geocodePosition(latLng) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, function (results, status) {
        if (status === "OK" && results[0]) {
            document.getElementById("pac-input").value = results[0].formatted_address;
            fillAddressDetails(results[0]);
        }
    });
}

// Helper: Fill Form Fields from Place Data
function fillAddressDetails(place) {
    // Fill Hidden Form Address Field
    document.getElementById("address").value = place.formatted_address;

    // Fill Lat/Lng
    if (place.geometry) {
        document.getElementById("latitude").value = place.geometry.location.lat();
        document.getElementById("longitude").value = place.geometry.location.lng();
    }

    // Extract City
    let city = "";
    if (place.address_components) {
        for (let component of place.address_components) {
            if (component.types.includes("locality")) {
                city = component.long_name;
                break;
            }
        }
    }
    document.getElementById("city").value = city;
}

// --- 2. File Validation ---
const imageInput = document.getElementById('eventImage');
const imageError = document.getElementById('imageError');
const brochureInput = document.getElementById('eventBrochure');
const brochureError = document.getElementById('brochureError');

function validateFile(input, errorElement, maxSizeMB, allowedTypes) {
    const file = input.files[0];
    errorElement.style.display = 'none';
    input.setCustomValidity("");

    if (file) {
        // Check Size
        if (file.size > maxSizeMB * 1024 * 1024) {
            showError(errorElement, `File is too big! Max size allowed is ${maxSizeMB}MB.`);
            input.value = "";
            return;
        }
        
        // Check Type
        if (!allowedTypes.includes(file.type)) {
            showError(errorElement, `Invalid format. Allowed: ${allowedTypes.join(', ')}`);
            input.value = "";
            return;
        }
    }
}

function showError(element, msg) {
    element.textContent = msg;
    element.style.display = 'block';
}

// Image Listener (Max 1MB, Images only)
imageInput.addEventListener('change', () => {
    validateFile(imageInput, imageError, 1, ['image/jpeg', 'image/png', 'image/jpg']);
});

// Brochure Listener (Max 5MB, PDF only)
brochureInput.addEventListener('change', () => {
    validateFile(brochureInput, brochureError, 5, ['application/pdf']);
});

// // ---  Conditional Volunteer Fields Logic ---
//     const needVolunteersCheckbox = document.getElementById('needVolunteers');
//     const volunteerFields = document.getElementById('volunteerFields');
//     const volunteerInputs = volunteerFields.querySelectorAll('input');

//     needVolunteersCheckbox.addEventListener('change', function() {
//         if (this.checked) {
//             volunteerFields.style.display = 'block';
//             // Make volunteer fields required when section is visible
//             volunteerInputs.forEach(input => input.setAttribute('required', 'true'));
//         } else {
//             volunteerFields.style.display = 'none';
//             // Remove required attribute and clear values when hidden
//             volunteerInputs.forEach(input => {
//                 input.removeAttribute('required');
//                 input.value = ''; 
//             });
//             document.getElementById('volunteerBannerError').style.display = 'none';
//             document.getElementById('volunteerBrochureError').style.display = 'none';
//         }
//     });

// ---  Conditional Volunteer Fields Logic ---
    const needVolunteersCheckbox = document.getElementById('needVolunteers');
    const volunteerFields = document.getElementById('volunteerFields');
    const volunteerInputs = volunteerFields.querySelectorAll('input');

    needVolunteersCheckbox.addEventListener('change', function() {
        // Check if we are currently editing an existing event
        const isEditMode = new URLSearchParams(window.location.search).has('edit');

        if (this.checked) {
            volunteerFields.style.display = 'block';
            
            volunteerInputs.forEach(input => {
                // If in Edit Mode, do NOT make file inputs required again.
                // Otherwise, users get locked out if they accidentally toggle the checkbox.
                if (isEditMode && input.type === 'file') {
                    input.removeAttribute('required');
                } else {
                    input.setAttribute('required', 'true');
                }
            });
        } else {
            volunteerFields.style.display = 'none';
            // Remove required attribute and clear values when hidden
            volunteerInputs.forEach(input => {
                input.removeAttribute('required');
                input.value = ''; 
            });
            document.getElementById('volunteerBannerError').style.display = 'none';
            document.getElementById('volunteerBrochureError').style.display = 'none';
        }
    });

// ---  Volunteer File Validation ---
    const volunteerBannerInput = document.getElementById('volunteerBanner');
    const volunteerBannerError = document.getElementById('volunteerBannerError');
    const volunteerBrochureInput = document.getElementById('volunteerBrochure');
    const volunteerBrochureError = document.getElementById('volunteerBrochureError');

    volunteerBannerInput.addEventListener('change', () => {
        validateFile(volunteerBannerInput, volunteerBannerError, 1, ['image/jpeg', 'image/png', 'image/jpg']);
    });

    volunteerBrochureInput.addEventListener('change', () => {
        validateFile(volunteerBrochureInput, volunteerBrochureError, 5, ['application/pdf']);
    });

    // ---  Event Description Character Counter ---
    const descriptionInput = document.getElementById('eventDescription');
    const charCountDisplay = document.getElementById('charCount');
    const MAX_CHARS = 5000;

    if (descriptionInput && charCountDisplay) {
        descriptionInput.addEventListener('input', () => {
            const currentLength = descriptionInput.value.length;
            charCountDisplay.textContent = `${currentLength} / ${MAX_CHARS} characters`;
            
            // Visual feedback when hitting the limit
            if (currentLength >= MAX_CHARS) {
                charCountDisplay.style.color = '#e74c3c'; 
            } else {
                charCountDisplay.style.color = '#666'; 
            }
        });
    }

// // --- 3. Form Submission (Updated for new structure) ---
//     document.getElementById('eventForm').addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         const submitBtn = document.getElementById('submitBtn');
//         submitBtn.textContent = "Submitting...";
//         submitBtn.disabled = true;

//         const formData = new FormData(e.target);

//         try {
//             const response = await fetch('/api/events', {
//                 method: 'POST',
//                 body: formData,
//                 credentials: 'include' 
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 alert('Event submitted successfully!'); 
//                 window.location.href = '/pages/create-event.html'; 
//             } else {
//                 alert('Error: ' + (result.message || 'Submission failed'));
//                 submitBtn.textContent = "Submit Event";
//                 submitBtn.disabled = false;
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Server error. Please check console.');
//             submitBtn.textContent = "Submit Event";
//             submitBtn.disabled = false;
//         } 

// --- 3. Form Submission (Updated for Edit Mode) ---
        document.getElementById('eventForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.textContent = "Submitting...";
            submitBtn.disabled = true;

            const formData = new FormData(e.target);
            
            // Determine if we are creating or updating
            const urlParams = new URLSearchParams(window.location.search);
            const editId = urlParams.get('edit');
            
            const apiUrl = editId ? `/api/events/${editId}` : '/api/events';
            const apiMethod = editId ? 'PUT' : 'POST'; // Use PUT for updates

            try {
                const response = await fetch(apiUrl, {
                    method: apiMethod,
                    body: formData,
                    credentials: 'include' 
                });

                const result = await response.json();

                if (response.ok) {
                    alert(editId ? 'Event updated successfully!' : 'Event submitted successfully!'); 
                    window.location.href = '/pages/create-event.html'; 
                } else {
                    alert('Error: ' + (result.message || 'Submission failed'));
                    submitBtn.textContent = editId ? "Update Event" : "Submit Event";
                    submitBtn.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Server error. Please check console.');
                submitBtn.textContent = editId ? "Update Event" : "Submit Event";
                submitBtn.disabled = false;
            } 
        });

// --- 4. Edit Mode Initialization ---

            const urlParams = new URLSearchParams(window.location.search);
            const editId = urlParams.get('edit');

            if (editId) {
                // Update UI for Edit Mode
                document.querySelector('header h1').textContent = 'Edit Your Event';
                document.querySelector('header p').textContent = 'Update the details below to modify your event.';
                const submitBtn = document.getElementById('submitBtn');
                submitBtn.textContent = 'Update Event';

                // Remove 'required' attributes from file inputs (users shouldn't have to re-upload files to edit text)
                document.getElementById('eventImage').removeAttribute('required');
                document.getElementById('eventBrochure').removeAttribute('required');
                
                try {
                    // Fetch existing event data
                    const response = await fetch(`/api/events/${editId}`);
                    if (!response.ok) throw new Error('Failed to fetch event data');
                    
                    const eventData = await response.json();

                    // Populate text/number/date fields
                    const fieldsToPopulate = [
                        'organizerName', 'organizationName', 'organizerEmail', 'mobileNumber', 
                        'eventName', 'category', 'eventDescription', 'address', 'city', 
                        'latitude', 'longitude', 'googleFormLink', 'eventDuration', 'availableSlots'
                    ];

                    fieldsToPopulate.forEach(field => {
                        if (document.getElementById(field) && eventData[field]) {
                            document.getElementById(field).value = eventData[field];
                        }
                    });

                    // Handle Dates and Times formatting for HTML inputs
                    if (eventData.date) {
                        document.getElementById('eventDate').value = eventData.date.split('T')[0];
                    }
                    if (eventData.time) {
                        document.getElementById('eventTime').value = eventData.time;
                    }

                    // Handle Checkbox and Volunteer fields
                    if (eventData.needVolunteers) {
                        document.getElementById('needVolunteers').checked = true;
                        document.getElementById('volunteerFields').style.display = 'block';
                        document.getElementById('volunteerSlots').value = eventData.volunteerSlots || '';
                        document.getElementById('volunteerFormLink').value = eventData.volunteerFormLink || '';
                        
                        // Remove required on volunteer files for edits
                        document.getElementById('volunteerBanner').removeAttribute('required');
                        document.getElementById('volunteerBrochure').removeAttribute('required');
                    }

                    // Update Map Marker if initialized
                    if (typeof map !== 'undefined' && eventData.latitude && eventData.longitude) {
                        const pos = { lat: parseFloat(eventData.latitude), lng: parseFloat(eventData.longitude) };
                        marker.setPosition(pos);
                        map.setCenter(pos);
                    }

                } catch (error) {
                    console.error('Error loading event for edit:', error);
                    alert('Could not load event data. Redirecting to form.');
                }
            }

        // --- 5. Gamification & SDG Score Logic ---
    const impactInputs = document.querySelectorAll('.impact-calc');
    const scoreDisplay = document.getElementById('estScoreDisplay');
    const hiddenScoreInput = document.getElementById('calculatedSdgScore');

    function calculateImpactScore() {
        let totalScore = 0;

        impactInputs.forEach(input => {
            // Add points if it's a checked checkbox OR a checked radio button
            if ((input.type === 'checkbox' || input.type === 'radio') && input.checked) {
                totalScore += parseInt(input.getAttribute('data-points'), 10);
            }
        });

        // Update UI
        scoreDisplay.textContent = `+${totalScore}`;
        
        // Add a slight pop animation to the score
        scoreDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => scoreDisplay.style.transform = 'scale(1)', 200);

        // Update hidden field for FormData submission
        hiddenScoreInput.value = totalScore;
    }

    // Attach listeners to all impact inputs
    impactInputs.forEach(input => {
        input.addEventListener('change', calculateImpactScore);
    });

    // Initial calculation on load
    calculateImpactScore();

    // Fetch and display total user credits on load
// Fetch and display total user credits and username on load
    async function fetchUserCredits() {
        try {
            const response = await fetch('/api/users/me');
            if (response.ok) {
                const userData = await response.json();
                
                // Update total credits
                document.getElementById('totalUserCredits').textContent = userData.totalCredits || 0;
                
                // Update welcome banner with the user's name from the database
                const welcomeNameEl = document.getElementById('welcomeUserName');
                if (welcomeNameEl && userData.username) {
                    welcomeNameEl.textContent = userData.username;
                }
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    }

    fetchUserCredits();
});

