// Mobile Menu Functionality - HANYA UNTUK MOBILE
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Toggle mobile menu hanya di mobile
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function() {
                if (mobileMenuBtn && mobileMenu) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Update active state for mobile
                mobileNavItems.forEach(navItem => navItem.classList.remove('active'));
                this.classList.add('active');
                
                // Update active state for desktop
                const href = this.getAttribute('href');
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                    if (navItem.getAttribute('href') === href) {
                        navItem.classList.add('active');
                    }
                });
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                
                // Calculate offset based on navigation height
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.pushState(null, null, targetId);
                
                // Update active state for desktop navigation
                if (window.innerWidth > 768) {
                    navItems.forEach(item => {
                        item.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Active nav link on scroll
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'contact'];
        const navHeight = document.querySelector('nav').offsetHeight;
        
        let currentSection = 'home';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop - navHeight;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            }
        });
        
        // Update desktop nav items
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
        
        // Update mobile nav items if mobile menu is active
        mobileNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
    
    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Certificate Modal Functionality
    const modal = document.getElementById('certificate-modal');
    const modalImage = document.getElementById('modal-certificate-image');
    const closeBtn = document.querySelector('.modal-close');
    const certificateImages = document.querySelectorAll('.certificate-img');
    
    if (modal && modalImage && closeBtn) {
        certificateImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImage.src = this.src;
                modalImage.alt = this.alt;
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Handle image errors
    function handleImageError(img) {
        const placeholderUrl = 'https://via.placeholder.com/';
        let size = '300x250';
        let text = 'Image';
        
        if (img.alt.includes('Hafid')) {
            size = '184x184';
            text = 'Hafid+Alfisani';
        } else if (img.alt.includes('Android')) {
            size = '140x140';
            text = 'Android+Apps';
        } else if (img.alt.includes('Web')) {
            size = '140x140';
            text = 'Web+Projects';
        } else if (img.alt.includes('Database')) {
            size = '140x140';
            text = 'Database+Systems';
        } else if (img.alt.includes('Tools')) {
            size = '140x140';
            text = 'Tools+%26+Utilities';
        } else if (img.alt.includes('Certificate')) {
            size = '300x250';
            text = 'Certificate';
        } else if (img.alt.includes('Mobile')) {
            size = '300x200';
            text = 'Mobile+App';
        } else if (img.alt.includes('Web Application')) {
            size = '300x200';
            text = 'Web+App';
        } else if (img.alt.includes('Database System')) {
            size = '300x200';
            text = 'Database';
        } else if (img.alt.includes('Development Tools')) {
            size = '300x200';
            text = 'Tools';
        }
        
        img.src = `${placeholderUrl}${size}/3b82f6/ffffff?text=${text}`;
        img.style.border = '2px dashed #3b82f6';
    }
    
    // Add error handlers to images
    document.querySelectorAll('img[src^="Data/"]').forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
        
        // Check if image already failed to load
        if (img.complete && img.naturalWidth === 0) {
            handleImageError(img);
        }
    });
    
    // Scroll Reveal Animations
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            delay: 200,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            reset: false,
            mobile: true
        });
        
        sr.reveal('.reveal', {
            interval: 100
        });
    }
    
    // Interactive photo effect
    const aboutPhoto = document.querySelector('.about-photo-container .hero-img-modern');
    if (aboutPhoto) {
        let resetTimeout;
        const photoFrame = aboutPhoto.parentElement;
        
        function setParallax(e) {
            if (window.innerWidth > 768) { // Only on desktop
                const rect = photoFrame.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const rotateX = (y - 0.5) * 10;
                const rotateY = (x - 0.5) * -10;
                
                photoFrame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                aboutPhoto.style.transform = `rotateX(${-rotateX * 0.5}deg) rotateY(${-rotateY * 0.5}deg) scale(1.02)`;
                
                clearTimeout(resetTimeout);
            }
        }
        
        function resetParallax() {
            photoFrame.style.transform = '';
            aboutPhoto.style.transform = '';
        }
        
        photoFrame.addEventListener('mousemove', setParallax);
        photoFrame.addEventListener('mouseleave', () => { 
            resetTimeout = setTimeout(resetParallax, 200); 
        });
    }
    
    // Enhance project cards with dynamic content
    const categoryCards = document.querySelectorAll('.category-card');
    const showcaseCards = document.querySelectorAll('.project-showcase-card');
    
    categoryCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = '';
            }
        });
    });
    
    showcaseCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = '';
            }
        });
    });
    
    // Window resize handler
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Update layout after resize
            updateActiveNav();
            
            // Close mobile menu if window is resized to desktop size
            if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });
    
    // Initialize
    updateActiveNav();
});