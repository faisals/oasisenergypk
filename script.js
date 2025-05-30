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
    } else {
        console.warn('Hero headline element not found');
    }
}

// Set random headline when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setRandomHeadline();
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Stepper controls for appliance counts
document.addEventListener('DOMContentLoaded', function() {
    // Handle stepper buttons
    document.querySelectorAll('.stepper-btn-plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const inputName = this.getAttribute('data-input');
            const input = document.querySelector(`input[name="${inputName}"]`);
            const currentValue = parseInt(input.value) || 0;
            const maxValue = parseInt(input.getAttribute('max')) || 100;
            
            if (currentValue < maxValue) {
                input.value = currentValue + 1;
            }
        });
    });
    
    document.querySelectorAll('.stepper-btn-minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const inputName = this.getAttribute('data-input');
            const input = document.querySelector(`input[name="${inputName}"]`);
            const currentValue = parseInt(input.value) || 0;
            const minValue = parseInt(input.getAttribute('min')) || 0;
            
            if (currentValue > minValue) {
                input.value = currentValue - 1;
            }
        });
    });
    
    // Phone number formatting
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
    
    // Auto-detect location functionality
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
});

// Multi-step form wizard
let currentStep = 1;
const totalSteps = 3;

function updateStepIndicators(step) {
    // Update step indicators
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`step-${i}-indicator`);
        if (!indicator) {
            console.warn(`Step indicator step-${i}-indicator not found`);
            continue;
        }
        
        const circle = indicator.querySelector('div');
        const text = indicator.querySelector('span');
        const progressLine = document.getElementById(`progress-${i}-${i+1}`);
        
        if (i < step) {
            // Completed step
            circle.className = 'w-8 h-8 sm:w-10 sm:h-10 bg-oasis-green text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold';
            text.className = 'ml-1 sm:ml-2 text-xs sm:text-sm font-medium text-oasis-green';
            if (progressLine) progressLine.className = 'w-8 sm:w-12 h-0.5 bg-oasis-green';
        } else if (i === step) {
            // Current step
            circle.className = 'w-8 h-8 sm:w-10 sm:h-10 bg-oasis-blue text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold';
            text.className = 'ml-1 sm:ml-2 text-xs sm:text-sm font-medium text-oasis-blue';
        } else {
            // Future step
            circle.className = 'w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold';
            text.className = 'ml-1 sm:ml-2 text-xs sm:text-sm font-medium text-gray-500';
            if (progressLine) progressLine.className = 'w-8 sm:w-12 h-0.5 bg-gray-300';
        }
    }
    
    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = (step / totalSteps) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function showStep(step) {
    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
        const stepElement = document.getElementById(`step-${i}`);
        if (stepElement) {
            stepElement.classList.add('hidden');
        } else {
            console.warn(`Step element step-${i} not found`);
        }
    }
    
    // Show current step
    const currentStepElement = document.getElementById(`step-${step}`);
    if (currentStepElement) {
        currentStepElement.classList.remove('hidden');
        
        // Update indicators
        updateStepIndicators(step);
        
        // Scroll to top of form
        currentStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.error(`Current step element step-${step} not found`);
    }
}

function validateStep(step) {
    switch(step) {
        case 1:
            const meterType = document.querySelector('input[name="meter-type"]:checked');
            const avgBill = document.querySelector('input[name="avg-bill"]').value;
            const avgUnits = document.querySelector('input[name="avg-units"]').value;
            
            if (!meterType) {
                alert('Please select your meter type');
                return false;
            }
            if (!avgBill || avgBill <= 0) {
                alert('Please enter your average electricity bill');
                return false;
            }
            if (!avgUnits || avgUnits <= 0) {
                alert('Please enter your average electricity units');
                return false;
            }
            return true;
            
        case 2:
            // Step 2 is optional - appliance count
            return true;
            
        case 3:
            const fullName = document.querySelector('input[name="full-name"]').value;
            const phone = document.querySelector('input[name="phone"]').value;
            
            if (!fullName || fullName.trim() === '') {
                alert('Please enter your full name');
                return false;
            }
            if (!phone || phone.trim() === '') {
                alert('Please enter your phone number');
                return false;
            }
            return true;
            
        default:
            return true;
    }
}

// Navigation handlers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize wizard - show step 1 by default
    showStep(1);
    
    // Next to step 2
    const nextToStep2 = document.getElementById('next-to-step-2');
    if (nextToStep2) {
        nextToStep2.addEventListener('click', function() {
            if (validateStep(1)) {
                currentStep = 2;
                showStep(currentStep);
            }
        });
    }
    
    // Next to step 3
    const nextToStep3 = document.getElementById('next-to-step-3');
    if (nextToStep3) {
        nextToStep3.addEventListener('click', function() {
            if (validateStep(2)) {
                currentStep = 3;
                showStep(currentStep);
            }
        });
    }
    
    // Back to step 1
    const backToStep1 = document.getElementById('back-to-step-1');
    if (backToStep1) {
        backToStep1.addEventListener('click', function() {
            currentStep = 1;
            showStep(currentStep);
        });
    }
    
    // Back to step 2
    const backToStep2 = document.getElementById('back-to-step-2');
    if (backToStep2) {
        backToStep2.addEventListener('click', function() {
            currentStep = 2;
            showStep(currentStep);
        });
    }
});

// Form submission handler with reCAPTCHA
const contactForm = document.querySelector('#contact form[name="solar-quote"]');
if (contactForm) {
    let recaptchaShown = false;
    
    contactForm.addEventListener('submit', function(e) {
        const recaptchaContainer = document.getElementById('recaptcha-container');
        const submitBtn = document.getElementById('submit-btn');
        
        // If reCAPTCHA hasn't been shown yet, show it and prevent submission
        if (!recaptchaShown && recaptchaContainer) {
            e.preventDefault();
            recaptchaContainer.classList.remove('hidden');
            recaptchaShown = true;
            submitBtn.textContent = 'Complete Verification to Submit';
            
            // Scroll to reCAPTCHA for visibility
            recaptchaContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        
        // Normal submission flow after reCAPTCHA is completed
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Re-enable after a short delay in case submission fails
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });
}