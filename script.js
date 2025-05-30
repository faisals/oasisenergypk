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
});

// Form submission handler
const contactForm = document.querySelector('#contact form[name="solar-quote"]');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Netlify will handle the actual submission
        const submitBtn = this.querySelector('button[type="submit"]');
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