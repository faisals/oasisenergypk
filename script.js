// Random headline rotation
const headlines = [
    {
        text: "Reliable Solar Power for Your",
        highlight: "Home & Business",
        suffix: "in Karachi"
    },
    {
        text: "Solar Lagao,",
        highlight: "Garmi Bhagao",
        suffix: ""
    },
    {
        text: "Bijli Bhi, Thunnd Bhi,",
        highlight: "Bachat Bhi",
        suffix: ""
    },
    {
        text: "Karachi Ki Dhoop,",
        highlight: "Aap ka Munafa",
        suffix: ""
    },
    {
        text: "Bill Kam,",
        highlight: "Mazah Zyada",
        suffix: ""
    }
];

function setRandomHeadline() {
    const headlineElement = document.getElementById('hero-headline');
    if (headlineElement) {
        const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
        headlineElement.innerHTML = `
            ${randomHeadline.text} 
            <span class="text-oasis-green">${randomHeadline.highlight}</span> 
            ${randomHeadline.suffix}
        `;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Set random headline
    setRandomHeadline();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Navigation link click handler (for mobile menu closing)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Let the browser handle the smooth scrolling via CSS
            // Just close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Initialize form functionality (only if on the page with the form)
    const contactForm = document.querySelector('#contact form[name="solar-quote"]');
    if (contactForm) {
        initializeSteppers();
        initializePhoneInput();
        initializeLocationButton();
        initializeFormSubmission();
    }
});

// Form validation function
function validateForm() {
    // Validate electricity usage fields
    const meterType = document.querySelector('input[name="meter-type"]:checked');
    const avgBillInput = document.querySelector('input[name="avg-bill"]');
    const avgUnitsInput = document.querySelector('input[name="avg-units"]');
    
    if (!meterType) {
        alert('Please select your meter type');
        return false;
    }
    if (!avgBillInput || !avgBillInput.value || parseFloat(avgBillInput.value) <= 0) {
        alert('Please enter your average electricity bill');
        return false;
    }
    if (!avgUnitsInput || !avgUnitsInput.value || parseFloat(avgUnitsInput.value) <= 0) {
        alert('Please enter your average electricity units');
        return false;
    }
    
    // Validate contact fields
    const fullNameInput = document.querySelector('input[name="full-name"]');
    const phoneInput = document.querySelector('input[name="phone"]');
    
    if (!fullNameInput || !fullNameInput.value || fullNameInput.value.trim() === '') {
        alert('Please enter your full name');
        return false;
    }
    if (!phoneInput || !phoneInput.value || phoneInput.value.trim() === '') {
        alert('Please enter your phone number');
        return false;
    }
    // Basic phone validation - more flexible pattern
    const phoneValue = phoneInput.value.replace(/\D/g, ''); // Remove all non-digits
    if (!phoneValue.startsWith('03') || phoneValue.length !== 11) {
        alert('Please enter a valid Pakistani mobile number (03xx-xxxxxxx)');
        return false;
    }
    
    return true;
}

// Stepper controls for appliance counts
function initializeSteppers() {
    // Handle stepper buttons
    document.querySelectorAll('.stepper-btn-plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const inputName = this.getAttribute('data-input');
            const input = document.querySelector(`input[name="${inputName}"]`);
            if (input) {
                const currentValue = parseInt(input.value) || 0;
                const maxValue = parseInt(input.getAttribute('max')) || 100;
                
                if (currentValue < maxValue) {
                    input.value = currentValue + 1;
                }
            }
        });
    });
    
    document.querySelectorAll('.stepper-btn-minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const inputName = this.getAttribute('data-input');
            const input = document.querySelector(`input[name="${inputName}"]`);
            if (input) {
                const currentValue = parseInt(input.value) || 0;
                const minValue = parseInt(input.getAttribute('min')) || 0;
                
                if (currentValue > minValue) {
                    input.value = currentValue - 1;
                }
            }
        });
    });
}

// Phone number formatting
function initializePhoneInput() {
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            
            if (value.length > 0) {
                if (value.length <= 4) {
                    value = value.replace(/(\d{4})/, '$1');
                } else {
                    value = value.replace(/(\d{4})(\d{0,7})/, '$1-$2');
                }
                
                // Limit to 11 digits total
                if (value.replace('-', '').length > 11) {
                    value = value.substring(0, 12); // Account for dash
                }
            }
            
            e.target.value = value;
        });
        
        phoneInput.addEventListener('keydown', function(e) {
            // Allow: backspace, delete, tab, escape, enter
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true)) {
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }
}

// Auto-detect location functionality
function initializeLocationButton() {
    const locationBtn = document.getElementById('location-btn');
    const mapsInput = document.getElementById('maps-input');
    const locationBtnText = document.getElementById('location-btn-text');
    
    if (locationBtn && mapsInput && locationBtnText) {
        locationBtn.addEventListener('click', function() {
            // Check if geolocation is supported
            if (!navigator.geolocation) {
                locationBtnText.textContent = 'Not supported';
                setTimeout(() => locationBtnText.textContent = 'Use My Location', 2000);
                return;
            }
            
            // Check if we're on HTTPS (required for geolocation in many browsers)
            if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
                locationBtnText.textContent = 'HTTPS required';
                setTimeout(() => locationBtnText.textContent = 'Use My Location', 2000);
                return;
            }
            
            // Show loading state
            locationBtnText.textContent = 'Getting location...';
            locationBtn.disabled = true;
            
            // Get current position
            navigator.geolocation.getCurrentPosition(
                // Success callback
                function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const accuracy = position.coords.accuracy;
                    
                    // Create Google Maps URL with coordinates
                    const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
                    
                    // Fill the input field
                    mapsInput.value = mapsUrl;
                    
                    // Show success state
                    locationBtnText.textContent = '✅ Location Added';
                    
                    // Show accuracy info if not very accurate
                    if (accuracy > 100) {
                        setTimeout(() => {
                            locationBtnText.textContent = `±${Math.round(accuracy)}m accuracy`;
                        }, 1500);
                    }
                    
                    // Reset button after delay
                    setTimeout(() => {
                        locationBtnText.textContent = 'Use My Location';
                        locationBtn.disabled = false;
                    }, 3000);
                },
                // Error callback
                function(error) {
                    let errorMessage = 'Location unavailable';
                    
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = 'Permission denied';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Location unavailable';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Request timeout';
                            break;
                    }
                    
                    locationBtnText.textContent = errorMessage;
                    
                    // Reset button after delay
                    setTimeout(() => {
                        locationBtnText.textContent = 'Use My Location';
                        locationBtn.disabled = false;
                    }, 2000);
                },
                // Options
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes cache
                }
            );
        });
    }
}

// Form submission handler with reCAPTCHA
function initializeFormSubmission() {
    const contactForm = document.querySelector('#contact form[name="solar-quote"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = document.getElementById('submit-btn');
            
            // Validate form before submission
            if (!validateForm()) {
                e.preventDefault();
                return;
            }
            
            // Log submission for debugging
            console.log('Form is being submitted to Netlify...');
            
            // Normal submission flow
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
            }
            
            // Let the form submit naturally to Netlify
            // Don't re-enable button as page will redirect on success
        });
    }
}