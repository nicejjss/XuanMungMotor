/* ===============================
   XUÂN MỪNG MOTOR - SCRIPT
   =============================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
        // Simple animation or icon change can be done here.
        // For now, toggle an 'fa-times' class to change the icon visually if needed.
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Sticky Navbar & Background Blur on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Trigger scroll event on load in case user refreshed middle of page
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 4. Glitch Effect Logic (Removed as requested)
    // The glitch text effect on the hero text has been removed.

    // 5. Language Switcher Logic
    const langViBtn = document.getElementById('lang-vi');
    const langEnBtn = document.getElementById('lang-en');
    const langElements = document.querySelectorAll('.lang-text');

    const setLanguage = (lang) => {
        if (lang === 'vi') {
            langViBtn.classList.add('active');
            langEnBtn.classList.remove('active');
            document.documentElement.lang = 'vi';
        } else {
            langEnBtn.classList.add('active');
            langViBtn.classList.remove('active');
            document.documentElement.lang = 'en';
        }

        langElements.forEach(el => {
            const newText = el.getAttribute('data-' + lang);
            if (newText) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = newText;
                } else {
                    el.textContent = newText;
                }
            }
        });
        localStorage.setItem('xuanmung_lang', lang);
    };

    // Check saved language
    const savedLang = localStorage.getItem('xuanmung_lang') || 'vi';
    setLanguage(savedLang);

    langViBtn.addEventListener('click', () => setLanguage('vi'));
    langEnBtn.addEventListener('click', () => setLanguage('en'));

    // 6. Image Slider Logic
    const galleryImages = [
        'assets/slide/anh_cua_hang_1.jpg',
        'assets/slide/anh_xe_dien_1.jpg',
        'assets/slide/anh_xe_may_1.jpg',
        'assets/slide/anh2.jpg',
        'assets/slide/anh3.jpg',
        'assets/slide/anh4.jpg'
    ];

    const track = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    // Populate Slider
    if (track) {
        galleryImages.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slider-slide');
            const img = document.createElement('img');
            img.src = src;
            img.alt = "Ảnh cửa hàng Xuân Mừng";

            // Open Lightbox on click
            img.addEventListener('click', () => {
                openLightbox(index);
            });

            slide.appendChild(img);
            track.appendChild(slide);
        });

        let currentIndex = 0;
        const totalSlides = galleryImages.length;

        const updateSlider = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const nextSlide = () => {
            currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
            updateSlider();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
            updateSlider();
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        // Auto slide every 4 seconds
        let autoSlideInterval = setInterval(nextSlide, 4000);

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 4000);
        };

        // --- Lightbox Logic ---
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        let currentLightboxIndex = 0;

        const openLightbox = (index) => {
            currentLightboxIndex = index;
            lightboxImg.src = galleryImages[currentLightboxIndex];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore background scrolling
        };

        const changeLightboxImage = (direction) => {
            currentLightboxIndex += direction;
            if (currentLightboxIndex < 0) {
                currentLightboxIndex = totalSlides - 1;
            } else if (currentLightboxIndex >= totalSlides) {
                currentLightboxIndex = 0;
            }
            lightboxImg.src = galleryImages[currentLightboxIndex];
        };

        closeBtn.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        lightboxPrev.addEventListener('click', () => changeLightboxImage(-1));
        lightboxNext.addEventListener('click', () => changeLightboxImage(1));

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') changeLightboxImage(-1);
            if (e.key === 'ArrowRight') changeLightboxImage(1);
        });
    }

    // 7. Dark / Light Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('xuanmung_theme', theme);

        if (theme === 'light') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    };

    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('xuanmung_theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Optional: check OS level preference
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        if (prefersLight) {
            setTheme('light');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

});
