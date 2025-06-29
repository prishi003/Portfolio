// DOM Elements
const recommendationForm = document.getElementById('recommendationForm');
const recommendationsGrid = document.getElementById('recommendationsGrid');
const popup = document.getElementById('popup');
const homeIcon = document.querySelector('.home-icon');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Home icon scroll to top functionality
    homeIcon.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form submission handler
    recommendationForm.addEventListener('submit', handleFormSubmission);

    // Add animation to skill cards on scroll
    addScrollAnimations();
});

// Handle recommendation form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('recommenderName');
    const textInput = document.getElementById('recommendationText');
    
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    
    // Validate form
    if (!text) {
        alert('Please enter a recommendation message.');
        return;
    }
    
    // Create new recommendation
    addNewRecommendation(name, text);
    
    // Clear form
    nameInput.value = '';
    textInput.value = '';
    
    // Show popup confirmation
    showPopup();
}

// Add new recommendation to the grid
function addNewRecommendation(name, text) {
    // Create new recommendation card
    const newCard = document.createElement('div');
    newCard.className = 'recommendation-card';
    
    // Set up the content
    const recommenderName = name || 'Anonymous';
    newCard.innerHTML = `
        <p>"${text}"</p>
        <div class="recommender">- ${recommenderName}</div>
    `;
    
    // Add animation class
    newCard.style.opacity = '0';
    newCard.style.transform = 'translateY(20px)';
    
    // Append to grid
    recommendationsGrid.appendChild(newCard);
    
    // Trigger animation
    setTimeout(() => {
        newCard.style.transition = 'all 0.5s ease';
        newCard.style.opacity = '1';
        newCard.style.transform = 'translateY(0)';
    }, 100);
    
    // Scroll to the new recommendation
    setTimeout(() => {
        newCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, 600);
}

// Show popup confirmation
function showPopup() {
    popup.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
}

// Close popup
function closePopup() {
    popup.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close popup when clicking outside of it
popup.addEventListener('click', function(e) {
    if (e.target === popup) {
        closePopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.classList.contains('show')) {
        closePopup();
    }
});

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe skill cards and project items
    const animatedElements = document.querySelectorAll('.skill-card, .project-item, .recommendation-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Add typing effect to the main heading
function addTypingEffect() {
    const heading = document.querySelector('.about-text h2');
    const text = heading.textContent;
    heading.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            heading.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Initialize typing effect when about section is visible
const aboutSection = document.getElementById('about');
const typingObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(addTypingEffect, 500);
            typingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

typingObserver.observe(aboutSection);

// Add active nav link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for active nav highlighting
window.addEventListener('scroll', updateActiveNavLink);

// Add form validation with real-time feedback
document.getElementById('recommendationText').addEventListener('input', function() {
    const charCount = this.value.length;
    const maxLength = 500;
    
    // Create or update character counter
    let counter = document.getElementById('charCounter');
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'charCounter';
        counter.style.textAlign = 'right';
        counter.style.fontSize = '0.9rem';
        counter.style.color = '#666';
        counter.style.marginTop = '0.5rem';
        this.parentNode.insertBefore(counter, this.nextSibling);
    }
    
    counter.textContent = `${charCount}/${maxLength} characters`;
    
    if (charCount > maxLength) {
        counter.style.color = '#e74c3c';
        this.style.borderColor = '#e74c3c';
    } else if (charCount > maxLength * 0.8) {
        counter.style.color = '#f39c12';
        this.style.borderColor = '#f39c12';
    } else {
        counter.style.color = '#27ae60';
        this.style.borderColor = '#3b82f6';
    }
});

// Add smooth hover effects for cards
document.querySelectorAll('.skill-card, .project-item, .recommendation-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}); 