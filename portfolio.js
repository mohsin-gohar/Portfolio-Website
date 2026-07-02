(function () {
    'use strict';

    // =============================================================
    // 1. DATA — pulled from data.js (window.PORTFOLIO_DATA), so
    //    every page always shows the exact same information.
    // =============================================================
    var DATA = window.PORTFOLIO_DATA || { skillsData: [], projectsData: [], servicesData: [] };
    var skillsData = DATA.skillsData;
    var projectsData = DATA.projectsData;
    var servicesData = DATA.servicesData;

    // How many projects to show on the home page grid.
    var HOME_PROJECTS_LIMIT = 4;

    // =============================================================
    // 2. UTILITY: Toast Notification System
    // =============================================================

    function showToast(message, type) {
        type = type || 'success';
        var container = document.getElementById('toastContainer');
        if (!container) return;
        var toast = document.createElement('div');
        toast.className = 'toast ' + type;

        var iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        toast.innerHTML = '<i class="fas ' + iconClass + '"></i><span>' + message + '</span>';

        container.appendChild(toast);

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                toast.classList.add('show');
            });
        });

        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 400);
        }, 4000);
    }

    // =============================================================
    // 3. TYPING EFFECT — Hero heading
    // =============================================================
    function initTypingEffect() {
        var phrases = ['I Build Modern', 'And', 'Responsive Websites'];
        var container = document.getElementById('typingText');
        if (!container) return;

        var phraseIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var pauseAfterType = false;
        var pauseAfterDelete = false;

        function buildHTML() {
            var html = '';
            for (var p = 0; p <= phraseIndex; p++) {
                if (p > 0) html += '<br />';
                var text = phrases[p];
                if (p === phraseIndex) {
                    text = phrases[p].substring(0, charIndex);
                }
                if (p === 1) {
                    text = '<span class="and">' + text + '</span>';
                }
                html += text;
            }
            return html;
        }

        function tick() {
            var currentPhrase = phrases[phraseIndex];

            if (pauseAfterType) {
                pauseAfterType = false;
                if (phraseIndex >= phrases.length - 1) {
                    isDeleting = true;
                    setTimeout(tick, 2000);
                    return;
                }
                phraseIndex++;
                charIndex = 0;
                setTimeout(tick, 300);
                return;
            }

            if (pauseAfterDelete) {
                pauseAfterDelete = false;
                isDeleting = false;
                phraseIndex = 0;
                charIndex = 0;
                setTimeout(tick, 500);
                return;
            }

            if (!isDeleting) {
                charIndex++;
                container.innerHTML = buildHTML();

                if (charIndex > currentPhrase.length) {
                    pauseAfterType = true;
                    setTimeout(tick, 600);
                    return;
                }
                setTimeout(tick, 80 + Math.random() * 40);
            } else {
                charIndex--;
                if (charIndex < 0) {
                    if (phraseIndex <= 0) {
                        pauseAfterDelete = true;
                        setTimeout(tick, 300);
                        return;
                    }
                    phraseIndex--;
                    charIndex = phrases[phraseIndex].length;
                    setTimeout(tick, 100);
                    return;
                }
                container.innerHTML = buildHTML();
                setTimeout(tick, 40);
            }
        }

        setTimeout(tick, 800);
    }

    // =============================================================
    // 4. RENDER FUNCTIONS
    // =============================================================

    function renderSkills() {
        var container = document.getElementById('skills-list');
        if (!container) return;

        var html = '';
        for (var i = 0; i < skillsData.length; i++) {
            var skill = skillsData[i];
            html += '<div class="skill-item reveal">' +
                '<div class="skill-info">' +
                    '<span class="skill-name">' + skill.name + '</span>' +
                    '<span class="skill-percentage" data-target="' + skill.percentage + '">0%</span>' +
                '</div>' +
                '<div class="progress-line">' +
                    '<span data-width="' + skill.percentage + '"></span>' +
                '</div>' +
            '</div>';
        }
        container.innerHTML = html;
    }

    function isLinkDisabled(link) {
        return !link || link === '#';
    }

    function buildProjectCardHTML(project) {
        var shortDesc = project.description.length > 100
            ? project.description.substring(0, 100) + '...'
            : project.description;

        var liveDisabled = isLinkDisabled(project.liveLink);
        var codeDisabled = isLinkDisabled(project.githubLink);
        var liveHref = liveDisabled ? 'javascript:void(0)' : project.liveLink;
        var codeHref = codeDisabled ? 'javascript:void(0)' : project.githubLink;

        var techChips = '';
        for (var t = 0; t < Math.min(project.techStack.length, 3); t++) {
            techChips += '<span class="tech-chip">' + project.techStack[t] + '</span>';
        }

        return '<div class="project-card" data-project-id="' + project.id + '">' +
            '<div class="project-card-image">' +
                '<img src="' + project.images[0] + '" alt="' + project.title + '" loading="lazy" />' +
                '<div class="project-card-image-overlay">' +
                    '<span data-action="details" class="overlay-view-btn"><i class="fas fa-eye"></i> View Details</span>' +
                '</div>' +
            '</div>' +
            '<div class="project-card-body">' +
                '<h2>' + project.title + '</h2>' +
                '<p>' + shortDesc + '</p>' +
                '<div class="project-card-tech">' + techChips + '</div>' +
                '<div class="project-card-actions">' +
                    '<button type="button" class="card-action-btn primary" data-action="details">' +
                        '<i class="fas fa-eye"></i> Details' +
                    '</button>' +
                    '<a class="card-action-btn' + (liveDisabled ? ' disabled' : '') + '" href="' + liveHref + '" target="_blank" rel="noopener" data-action="live">' +
                        '<i class="fas fa-external-link-alt"></i> Live' +
                    '</a>' +
                    '<a class="card-action-btn' + (codeDisabled ? ' disabled' : '') + '" href="' + codeHref + '" target="_blank" rel="noopener" data-action="code">' +
                        '<i class="fab fa-github"></i> Code' +
                    '</a>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function renderProjectsInto(containerId, list) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var html = '';
        for (var i = 0; i < list.length; i++) {
            html += buildProjectCardHTML(list[i]);
        }
        container.innerHTML = html;
    }

    function renderProjects() {
        // Home page — first N featured/first projects, with a
        // "Show All Projects" button that links to projects.html
        var homeGrid = document.getElementById('project-grid');
        if (homeGrid) {
            renderProjectsInto('project-grid', projectsData.slice(0, HOME_PROJECTS_LIMIT));
        }

        // Dedicated projects page — every project, 3 per row
        var allGrid = document.getElementById('project-grid-all');
        if (allGrid) {
            renderProjectsInto('project-grid-all', projectsData);
        }
    }

    function renderServices() {
        var container = document.getElementById('services-grid');
        if (!container) return;

        var html = '';
        for (var i = 0; i < servicesData.length; i++) {
            var service = servicesData[i];
            html += '<div class="service-card">' +
                '<div class="service-icon-wrap"><i class="fas ' + service.icon + '"></i></div>' +
                '<h3>' + service.title + '</h3>' +
                '<p>' + service.description + '</p>' +
            '</div>';
        }
        container.innerHTML = html;
    }

    // =============================================================
    // 5. SKILL BAR ANIMATION — Intersection Observer se trigger
    // =============================================================

    var skillsAnimated = false;

    function animateSkillBars() {
        if (skillsAnimated) return;

        var bars = document.querySelectorAll('#skills-list .progress-line span');
        var percentages = document.querySelectorAll('#skills-list .skill-percentage');

        if (bars.length === 0) return;

        skillsAnimated = true;

        for (var i = 0; i < bars.length; i++) {
            (function (index) {
                var bar = bars[index];
                var pct = percentages[index];
                var targetWidth = parseInt(bar.getAttribute('data-width'), 10);
                var targetPct = parseInt(pct.getAttribute('data-target'), 10);

                setTimeout(function () {
                    bar.style.width = targetWidth + '%';
                    bar.classList.add('animated');
                    animateCounter(pct, targetPct);
                }, index * 150);
            })(i);
        }
    }

    function animateCounter(element, target) {
        var current = 0;
        var duration = 1500;
        var stepTime = 20;
        var steps = duration / stepTime;
        var increment = target / steps;

        var timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current) + '%';
        }, stepTime);

        element.classList.add('counted');
    }

    // =============================================================
    // 6. SCROLL REVEAL — Intersection Observer
    // =============================================================

    function initScrollReveal() {
        var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    function initCardReveal() {
        var cards = document.querySelectorAll('.project-card, .service-card');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var parent = entry.target.parentNode;
                    var siblings = parent.querySelectorAll('.project-card, .service-card');
                    var index = Array.prototype.indexOf.call(siblings, entry.target);

                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, index * 100);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        cards.forEach(function (card) {
            observer.observe(card);
        });
    }

    function initSkillsObserver() {
        var skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillsSection);
    }

    // =============================================================
    // 7. PROJECT DETAIL OVERLAY
    // =============================================================

    function findProjectById(projectId) {
        for (var i = 0; i < projectsData.length; i++) {
            if (projectsData[i].id === projectId) return projectsData[i];
        }
        return null;
    }

    function openProjectDetail(projectId) {
        var project = findProjectById(projectId);
        if (!project) return;

        var titleEl = document.getElementById('detailTitle');
        var descEl = document.getElementById('detailDescription');
        if (!titleEl || !descEl) return;

        titleEl.textContent = project.title;
        descEl.textContent = project.description;

        var liveLink = document.getElementById('detailLiveLink');
        var githubLink = document.getElementById('detailGithubLink');

        if (!isLinkDisabled(project.liveLink)) {
            liveLink.href = project.liveLink;
            liveLink.style.display = 'inline-block';
        } else {
            liveLink.style.display = 'none';
        }

        if (!isLinkDisabled(project.githubLink)) {
            githubLink.href = project.githubLink;
            githubLink.style.display = 'inline-block';
        } else {
            githubLink.style.display = 'none';
        }

        // Gallery — each image opens the lightbox at its own index
        var gallery = document.getElementById('detailGallery');
        var galleryHTML = '';
        for (var g = 0; g < project.images.length; g++) {
            galleryHTML += '<img src="' + project.images[g] + '" alt="' + project.title + ' screenshot ' + (g + 1) + '" data-index="' + g + '" />';
        }
        gallery.innerHTML = galleryHTML;
        gallery.setAttribute('data-project-id', project.id);

        var techStack = document.getElementById('detailTechStack');
        var techHTML = '';
        for (var t = 0; t < project.techStack.length; t++) {
            techHTML += '<span class="tech-tag">' + project.techStack[t] + '</span>';
        }
        techStack.innerHTML = techHTML;

        var overlay = document.getElementById('projectOverlay');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        overlay.scrollTop = 0;
    }

    function closeProjectDetail() {
        var overlay = document.getElementById('projectOverlay');
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // =============================================================
    // 8. LIGHTBOX — full-screen image viewer for the gallery
    // =============================================================

    var lightboxImages = [];
    var lightboxIndex = 0;

    function openLightbox(images, startIndex) {
        lightboxImages = images;
        lightboxIndex = startIndex || 0;
        var overlay = document.getElementById('lightboxOverlay');
        if (!overlay) return;
        overlay.classList.add('active');
        updateLightboxImage();
    }

    function updateLightboxImage() {
        var img = document.getElementById('lightboxImage');
        var counter = document.getElementById('lightboxCounter');
        if (!img || !lightboxImages.length) return;
        img.src = lightboxImages[lightboxIndex];
        if (counter) {
            counter.textContent = (lightboxIndex + 1) + ' / ' + lightboxImages.length;
        }
    }

    function lightboxNext() {
        if (!lightboxImages.length) return;
        lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
        updateLightboxImage();
    }

    function lightboxPrev() {
        if (!lightboxImages.length) return;
        lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightboxImage();
    }

    function closeLightbox() {
        var overlay = document.getElementById('lightboxOverlay');
        if (!overlay) return;
        overlay.classList.remove('active');
    }

    function initLightbox() {
        var overlay = document.getElementById('lightboxOverlay');
        if (!overlay) return;

        var closeBtn = document.getElementById('lightboxClose');
        var nextBtn = document.getElementById('lightboxNext');
        var prevBtn = document.getElementById('lightboxPrev');

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (nextBtn) nextBtn.addEventListener('click', lightboxNext);
        if (prevBtn) prevBtn.addEventListener('click', lightboxPrev);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeLightbox();
        });

        // Open the lightbox when a gallery thumbnail is clicked
        var gallery = document.getElementById('detailGallery');
        if (gallery) {
            gallery.addEventListener('click', function (e) {
                var img = e.target.closest('img');
                if (!img) return;
                var projectId = parseInt(gallery.getAttribute('data-project-id'), 10);
                var project = findProjectById(projectId);
                if (!project) return;
                var index = parseInt(img.getAttribute('data-index'), 10) || 0;
                openLightbox(project.images, index);
            });
        }

        document.addEventListener('keydown', function (e) {
            if (!overlay.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') lightboxNext();
            if (e.key === 'ArrowLeft') lightboxPrev();
        });
    }

    // =============================================================
    // 9. NAVIGATION — Active link, smooth scroll, hamburger
    // =============================================================

    function initNavigation() {
        var navLinks = document.querySelectorAll('.nav-links a');
        var allNavAnchors = document.querySelectorAll('.nav-links a, .hire-btn');
        var hamburger = document.getElementById('hamburger');
        var navLinksContainer = document.getElementById('navLinks');

        allNavAnchors.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                // Only intercept same-page anchors (e.g. "#about").
                // Links like "index.html#about" are left to the browser
                // so they work correctly from projects.html too.
                if (targetId && targetId.charAt(0) === '#') {
                    var target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' });

                        navLinks.forEach(function (a) { a.classList.remove('active'); });
                        if (this.closest('.nav-links')) {
                            this.classList.add('active');
                        }
                    }
                }

                if (navLinksContainer) navLinksContainer.classList.remove('open');
                if (hamburger) hamburger.classList.remove('active');
            });
        });

        var sections = document.querySelectorAll('section[id], header[id]');
        var scrollTimeout = null;

        window.addEventListener('scroll', function () {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(function () {
                scrollTimeout = null;

                var scrollPos = window.scrollY + 150;
                var currentId = '';

                sections.forEach(function (section) {
                    if (section.offsetTop <= scrollPos) {
                        currentId = section.getAttribute('id');
                    }
                });

                navLinks.forEach(function (link) {
                    var href = link.getAttribute('href');
                    link.classList.remove('active');
                    if (href === '#' + currentId) {
                        link.classList.add('active');
                    }
                });
            }, 100);
        });

        if (hamburger) {
            hamburger.addEventListener('click', function () {
                this.classList.toggle('active');
                navLinksContainer.classList.toggle('open');
            });
        }
    }

    // =============================================================
    // 10. NAVBAR — stays fixed on scroll; gains a stronger
    //     background/shadow once the page has scrolled a bit.
    // =============================================================

    function initNavbarScroll() {
        var navbar = document.getElementById('navbar');
        if (!navbar) return;
        var ticking = false;

        function updateNavbarState() {
            if (window.scrollY > 30) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbarState);
                ticking = true;
            }
        });

        updateNavbarState();
    }

    // =============================================================
    // 11. BACK TO TOP BUTTON
    // =============================================================

    function initBackToTop() {
        var btn = document.getElementById('backToTop');
        if (!btn) return;
        var scrollTimeout = null;

        window.addEventListener('scroll', function () {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(function () {
                scrollTimeout = null;
                if (window.scrollY > 500) {
                    btn.classList.add('visible');
                } else {
                    btn.classList.remove('visible');
                }
            }, 100);
        });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =============================================================
    // 12. CONTACT FORM VALIDATION & SUBMIT
    // =============================================================

    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;
        var sendBtn = document.getElementById('sendBtn');

        var nameInput = document.getElementById('formName');
        var emailInput = document.getElementById('formEmail');
        var messageInput = document.getElementById('formMessage');

        var nameError = document.getElementById('nameError');
        var emailError = document.getElementById('emailError');
        var messageError = document.getElementById('messageError');

        nameInput.addEventListener('blur', function () { validateField(nameInput, nameError, validateName); });
        emailInput.addEventListener('blur', function () { validateField(emailInput, emailError, validateEmail); });
        messageInput.addEventListener('blur', function () { validateField(messageInput, messageError, validateMessage); });

        nameInput.addEventListener('input', function () { clearError(nameInput, nameError); });
        emailInput.addEventListener('input', function () { clearError(emailInput, emailError); });
        messageInput.addEventListener('input', function () { clearError(messageInput, messageError); });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var isNameValid = validateField(nameInput, nameError, validateName);
            var isEmailValid = validateField(emailInput, emailError, validateEmail);
            var isMessageValid = validateField(messageInput, messageError, validateMessage);

            if (!isNameValid || !isEmailValid || !isMessageValid) {
                showToast('Please fix the errors above', 'error');
                return;
            }

            sendBtn.disabled = true;
            sendBtn.classList.add('loading');
            sendBtn.innerHTML = '<span class="btn-spinner"></span> Sending...';

            setTimeout(function () {
                sendBtn.disabled = false;
                sendBtn.classList.remove('loading');
                sendBtn.innerHTML = '<span class="btn-spinner"></span> Send Message';

                form.reset();
                showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            }, 2000);
        });
    }

    function validateName(value) {
        return value.trim().length >= 2;
    }

    function validateEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    function validateMessage(value) {
        return value.trim().length >= 10;
    }

    function validateField(input, errorEl, validatorFn) {
        if (!validatorFn(input.value)) {
            input.classList.add('error-input');
            errorEl.classList.add('show');
            return false;
        } else {
            input.classList.remove('error-input');
            errorEl.classList.remove('show');
            return true;
        }
    }

    function clearError(input, errorEl) {
        input.classList.remove('error-input');
        errorEl.classList.remove('show');
    }

    // =============================================================
    // 13. PROJECT CARD CLICKS — single delegated listener works for
    //     both the home grid and the "all projects" grid.
    // =============================================================

    function initProjectCardClicks() {
        document.addEventListener('click', function (e) {
            var actionLink = e.target.closest('[data-action="live"], [data-action="code"]');
            if (actionLink) {
                if (actionLink.classList.contains('disabled')) {
                    e.preventDefault();
                    showToast('This link isn\'t available yet.', 'error');
                }
                e.stopPropagation();
                return;
            }

            var card = e.target.closest('.project-card');
            if (!card) return;

            var projectId = parseInt(card.getAttribute('data-project-id'), 10);
            if (!isNaN(projectId)) {
                openProjectDetail(projectId);
            }
        });
    }

    // =============================================================
    // 14. OVERLAY CLOSE — ESC, outside click, close button
    // =============================================================

    function initOverlay() {
        var overlay = document.getElementById('projectOverlay');
        if (!overlay) return;
        var closeBtn = document.getElementById('closeOverlayBtn');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeProjectDetail);
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeProjectDetail();
            }
        });

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                closeProjectDetail();
            }
        });
    }

    // =============================================================
    // 15. INITIALIZE — Sab kuch yahan se start hota hai
    // =============================================================

    function init() {
        renderSkills();
        renderProjects();
        renderServices();

        initScrollReveal();
        initCardReveal();
        initSkillsObserver();

        initNavigation();
        initNavbarScroll();

        initProjectCardClicks();
        initOverlay();
        initLightbox();
        initContactForm();
        initBackToTop();

        initTypingEffect();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
