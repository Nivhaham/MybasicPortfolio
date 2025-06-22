/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // ===== ENHANCED PORTFOLIO FEATURES =====

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.setAttribute('role', 'button');
    darkModeToggle.setAttribute('tabindex', '0');
    document.body.appendChild(darkModeToggle);

    // Check for saved theme preference or system preference
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        let theme = 'light';
        
        if (savedTheme) {
            theme = savedTheme;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = 'dark';
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
        return theme;
    };

    // Update theme icon
    const updateThemeIcon = (theme) => {
        if (theme === 'dark') {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    };

    // Initialize theme
    let currentTheme = initializeTheme();

    // Dark mode toggle functionality
    const toggleTheme = () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon(currentTheme);
        
        // Add visual feedback
        darkModeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            darkModeToggle.style.transform = 'scale(1)';
        }, 150);
    };

    darkModeToggle.addEventListener('click', toggleTheme);
    
    // Keyboard accessibility
    darkModeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                currentTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', currentTheme);
                updateThemeIcon(currentTheme);
            }
        });
    }

    // Enhanced Navigation Active State
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#sideNav .nav-link');

    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced Photo Gallery with Modal
    const photos = document.querySelectorAll('.lucas-photos img');
    let currentPhotoIndex = 0;

    // Create modal for photo gallery
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'photoModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Photo Gallery</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <img id="modalImage" src="" class="img-fluid" style="max-height: 70vh;">
                    <div class="mt-3">
                        <button class="btn btn-primary me-2" id="prevPhoto">
                            <i class="fas fa-chevron-left"></i> Previous
                        </button>
                        <button class="btn btn-primary" id="nextPhoto">
                            Next <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const photoModal = new bootstrap.Modal(modal);
    const modalImage = document.getElementById('modalImage');
    const prevBtn = document.getElementById('prevPhoto');
    const nextBtn = document.getElementById('nextPhoto');

    // Photo click handlers
    photos.forEach((photo, index) => {
        photo.addEventListener('click', () => {
            currentPhotoIndex = index;
            modalImage.src = photo.src;
            photoModal.show();
        });
    });

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        modalImage.src = photos[currentPhotoIndex].src;
    });

    nextBtn.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        modalImage.src = photos[currentPhotoIndex].src;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                photoModal.hide();
            }
        }
    });

    // Typing Animation for Main Title - DISABLED
    // const mainTitle = document.querySelector('h1.mb-0');
    // if (mainTitle) {
    //     const text = mainTitle.textContent;
    //     mainTitle.textContent = '';
    //     mainTitle.style.borderRight = '2px solid #667eea';
    //     
    //     let i = 0;
    //     const typeWriter = () => {
    //         if (i < text.length) {
    //             mainTitle.textContent += text.charAt(i);
    //             i++;
    //             setTimeout(typeWriter, 100);
    //         } else {
    //             setTimeout(() => {
    //                 mainTitle.style.borderRight = 'none';
    //             }, 1000);
    //         }
    //     };
    //     
    //     setTimeout(typeWriter, 1000);
    // }

    // Skill Progress Bars Animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const width = bar.getAttribute('aria-valuenow') + '%';
                bar.style.width = width;
            }
        });
    };

    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Initial call

    // Add skill badges to experience items
    const experienceItems = document.querySelectorAll('#experience .d-flex');
    const skillsData = {
        'Network Engineer': ['Python', 'Ansible', 'Cisco', 'Linux', 'TCP/IP'],
        'Cybersecurity Instructor': ['Security+', 'Penetration Testing', 'Risk Assessment', 'Training'],
        'Software Developer': ['JavaScript', 'React', 'Node.js', 'Git', 'Agile']
    };

    experienceItems.forEach(item => {
        const title = item.querySelector('h3');
        if (title) {
            const titleText = title.textContent.trim();
            Object.keys(skillsData).forEach(role => {
                if (titleText.includes(role.split(' ')[0])) {
                    const skillsContainer = document.createElement('div');
                    skillsContainer.className = 'mt-2';
                    skillsData[role].forEach(skill => {
                        const badge = document.createElement('span');
                        badge.className = 'skill-badge';
                        badge.textContent = skill;
                        skillsContainer.appendChild(badge);
                    });
                    item.appendChild(skillsContainer);
                }
            });
        }
    });

    // Contact Form Enhancement (if exists)
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
            
            if (isValid) {
                // Show success message
                const alert = document.createElement('div');
                alert.className = 'alert alert-success mt-3';
                alert.textContent = 'Message sent successfully! I will get back to you soon.';
                contactForm.appendChild(alert);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    inputs.forEach(input => {
                        input.classList.remove('is-valid');
                    });
                    alert.remove();
                }, 3000);
            }
        });
    }

    // Loading Animation
    const showLoading = () => {
        const loader = document.createElement('div');
        loader.className = 'loading-spinner show';
        loader.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.classList.remove('show');
            setTimeout(() => loader.remove(), 300);
        }, 1500);
    };

    // Performance optimization: Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Add animation classes to elements
    setTimeout(() => {
        document.querySelectorAll('section .row > div').forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.animationDelay = `${index * 0.1}s`;
        });
        
        document.querySelectorAll('.card').forEach((el, index) => {
            el.classList.add('slide-in-left');
            el.style.animationDelay = `${index * 0.2}s`;
        });
    }, 500);

    // Console welcome message
    console.log('%c🚀 Welcome to Niv Dagan\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cThis portfolio features modern animations and interactive elements.', 'color: #6c757d; font-size: 14px;');
    console.log('%cFeel free to explore the code and reach out if you have any questions!', 'color: #6c757d; font-size: 14px;');

});

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
