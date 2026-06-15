document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
   

    // 2. Scroll Progress Tracker
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }
    });

    // 3. Header Scrolled Class Toggle
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Hero Typing Animation
    const typingElement = document.getElementById('typing-text');
    const titles = [
        'Full-Stack Developer.',
        'Python Django Developer.',
        'MCA Engineering Student.',
        'Software Development Enthusiast.'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 1500; // Hold at complete word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Wait before starting next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    if (typingElement) {
        typeEffect();
    }

    // 5. Spotlight Hover Effect (Spotlight Card mouse tracker)
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 6. Scroll Triggers / Reveal Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('reveal-active');
                }, delay);
                
                // Unobserve after revealing
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 7. Magnetic Button Micro-interactions
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Shift button slightly towards mouse
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            
            // Shift inner elements if any
            const span = btn.querySelector('span');
            const icon = btn.querySelector('i');
            if (span) span.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            if (icon) icon.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Smoothly reset
            btn.style.transform = 'translate(0px, 0px)';
            const span = btn.querySelector('span');
            const icon = btn.querySelector('i');
            if (span) span.style.transform = 'translate(0px, 0px)';
            if (icon) icon.style.transform = 'translate(0px, 0px)';
        });
    });

    // 8. Custom Cursor Follow & Hover States
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorOutline = document.querySelector('.custom-cursor-outline');
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Trail speed (between 0 and 1, lower value = more delay)
    const speed = 0.15;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant inner dot placement
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });
    
    // Smooth animated outer circle
    function animateCursor() {
        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;
        
        if (cursorOutline) {
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Toggle hovering state for interactive elements
    const hoverables = document.querySelectorAll('a, button, input, textarea, select, .social-icon, .btn-social, .info-item, .project-link');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (cursorDot) cursorDot.classList.add('hovering');
            if (cursorOutline) cursorOutline.classList.add('hovering');
        });
        
        item.addEventListener('mouseleave', () => {
            if (cursorDot) cursorDot.classList.remove('hovering');
            if (cursorOutline) cursorOutline.classList.remove('hovering');
        });
    });
});
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeBtn.textContent = "☀️";
}

window.addEventListener("load", () => {
    setTimeout(() => {
        if (window.lucide) {
            lucide.createIcons();
        }
    }, 200);
});

