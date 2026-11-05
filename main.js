document.addEventListener('DOMContentLoaded', () => {

    // --- Page load fade-in ---
    document.body.classList.add('loaded');

    // --- Mobile Menu ---
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            toggle.classList.toggle('active');
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.classList.remove('active');
            });
        });
    }

    // --- Header shrink on scroll ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else if (scrollY < 20) {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // --- Hero Slider ---
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // --- Animated counter ---
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const increment = target / 40;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.ceil(current);
                        }
                    }, 30);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(counter);
    });

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    
    const revealOnLoad = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    };

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        revealElements.forEach(el => observer.observe(el));
        
        // Initial check for elements already in view
        revealOnLoad();
    }

    // --- Form Handling (AJAX Simulation) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const loader = contactForm.querySelector('.form-loader');
            const successMsg = contactForm.querySelector('.form-success-msg');
            const formContent = contactForm.querySelector('.form-body');

            if (loader) loader.classList.add('active');

            // Simulate server delay
            setTimeout(() => {
                if (loader) loader.classList.remove('active');
                if (formContent) formContent.style.display = 'none';
                if (successMsg) successMsg.classList.add('active');
            }, 2000);
        });
    }

    // --- Cookie Banner ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    if (cookieBanner && acceptBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => cookieBanner.classList.add('visible'), 2500);
        }
        acceptBtn.addEventListener('click', () => {
            cookieBanner.classList.remove('visible');
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }

    // --- Cart & Variant Logic ---
    document.querySelectorAll('.dish').forEach(dish => {
        const variantBtns = dish.querySelectorAll('.variant-btn');
        const orderBtn = dish.querySelector('.btn-order-small');
        const qtyInput = dish.querySelector('.qty-input');
        const minusBtn = dish.querySelector('.minus');
        const plusBtn = dish.querySelector('.plus');

        // Quantity controls
        if (qtyInput && minusBtn && plusBtn) {
            minusBtn.addEventListener('click', () => {
                let val = parseInt(qtyInput.value);
                if (val > 1) qtyInput.value = val - 1;
            });
            plusBtn.addEventListener('click', () => {
                let val = parseInt(qtyInput.value);
                if (val < 99) qtyInput.value = val + 1;
            });
        }

        variantBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('multi-select')) {
                    btn.classList.toggle('active');
                } else {
                    dish.querySelectorAll('.variant-btn:not(.multi-select)').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
            });
        });

        if (orderBtn) {
            orderBtn.addEventListener('click', () => {
                const title = dish.querySelector('.dish-title').textContent;
                const activeVariants = Array.from(dish.querySelectorAll('.variant-btn.active'))
                    .map(v => v.textContent)
                    .join(', ');
                const variantText = activeVariants ? ` (${activeVariants})` : '';
                const quantity = qtyInput ? qtyInput.value : 1;
                
                orderBtn.textContent = 'Hinzugefügt!';
                const originalBg = orderBtn.style.background;
                orderBtn.style.background = '#b8963e';
                
                console.log(`Bestellt: ${quantity}x ${title}${variantText}`);
                
                setTimeout(() => {
                    orderBtn.textContent = 'Bestellen';
                    orderBtn.style.background = originalBg;
                    if (qtyInput) qtyInput.value = 1;
                    // Reset multi-selects after order if desired, or keep them. Let's reset for fresh start.
                    dish.querySelectorAll('.variant-btn.multi-select').forEach(b => b.classList.remove('active'));
                }, 2000);
            });
        }
    });

    // --- WhatsApp Button Visibility ---
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                whatsappBtn.classList.add('visible');
            } else {
                whatsappBtn.classList.remove('visible');
            }
        }, { passive: true });
    }

    // --- Vespa Activation ---
    const vespaTrack = document.getElementById('vespa-track');
    if (vespaTrack) {
        // Start vespa after a short delay
        setTimeout(() => {
            vespaTrack.classList.add('active');
        }, 3000);
    }

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Menu Filters (menu.html) ---
    const filterWrap = document.getElementById('menu-filters');
    if (filterWrap) {
        const filterBtns = filterWrap.querySelectorAll('.menu-filter-btn');
        const sections = document.querySelectorAll('.menu-category-section');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.dataset.filter;
                sections.forEach(sec => {
                    const show = cat === 'all' || sec.dataset.category === cat;
                    sec.classList.toggle('filtered-out', !show);
                    if (show) {
                        sec.classList.remove('reveal-up', 'in-view');
                        void sec.offsetWidth; // reflow to re-trigger reveal
                        sec.classList.add('reveal-up');
                    }
                });
            });
        });
    }

    // --- Open Indicator (header) ---
    const openIndicator = document.getElementById('open-indicator');
    if (openIndicator) {
        const openText = openIndicator.querySelector('.open-text');
        function updateOpenState() {
            const now = new Date();
            const day = now.getDay(); // 0 = Sunday
            const minutes = now.getHours() * 60 + now.getMinutes();
            const openMin = 11 * 60 + 30; // 11:30
            const closeMin = 22 * 60;     // 22:00
            const isOpen = minutes >= openMin && minutes < closeMin;
            openIndicator.classList.toggle('closed', !isOpen);
            const timeStr = isOpen ? 'Jetzt geöffnet' : 'Geschlossen';
            const closesAt = isOpen ? ' · bis 22:00' : ' · öffnet 11:30';
            if (openText) openText.textContent = timeStr + closesAt;
        }
        updateOpenState();
        setInterval(updateOpenState, 60000);
    }

});

