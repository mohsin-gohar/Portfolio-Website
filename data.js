(function () {
    'use strict';

    // =============================================================
    // SKILLS
    // =============================================================
    const skillsData = [
        { name: 'HTML & CSS', percentage: 95 },
        { name: 'JavaScript (ES6+)', percentage: 90 },
        { name: 'React', percentage: 85 },
        { name: 'Next.js', percentage: 80 },
        { name: 'TypeScript', percentage: 80 },
        { name: 'Node.js', percentage: 75 },
        { name: 'Tailwind CSS', percentage: 88 },
        { name: 'Bootstrap', percentage: 85 },
        { name: 'Laravel', percentage: 70 },
        { name: 'ASP.NET Core', percentage: 65 }
    ];

    // =============================================================
    // PROJECTS — 12 total. Home page shows the first 4 (featured),
    // the "Show All Projects" button links to projects.html which
    // lists all 12 in a 3-per-row grid.
    // Replace the image paths below with your own screenshots —
    // just keep the same file names inside the /pics folder,
    // or update the paths to match your own images.
    // =============================================================
    const projectsData = [
        {
            id: 1,
            title: 'Portfolio Website',
            description: 'A modern personal portfolio to showcase professional skills, projects, and achievements. Built with clean, semantic code and responsive design principles.',
            images: ['pics/pro1.jpg', 'pics/pro2.jpg', 'pics/pro3.jpg', 'pics/pro4.jpg'],
            techStack: ['React', 'JavaScript', 'Tailwind CSS', 'HTML'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: true
        },
        {
            id: 2,
            title: 'E-Commerce Store',
            description: 'A fully functional e-commerce platform with product catalog, shopping cart, checkout process, and payment gateway integration.',
            images: ['pics/pro2.jpg', 'pics/pro1.jpg', 'pics/pro3.jpg'],
            techStack: ['React', 'Node.js', 'Laravel', 'MySQL'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: true
        },
        {
            id: 3,
            title: 'Task Manager App',
            description: 'A productivity tool for managing daily tasks with drag-and-drop, task prioritization, deadlines, and real-time updates.',
            images: ['pics/pro3.jpg', 'pics/pro1.jpg', 'pics/pro4.jpg', 'pics/pro2.jpg'],
            techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: true
        },
        {
            id: 4,
            title: 'Blog Platform',
            description: 'A dynamic blogging platform with user authentication, post creation, a comments system, and an admin dashboard for content management.',
            images: ['pics/pro4.jpg', 'pics/pro2.jpg'],
            techStack: ['Next.js', 'React', 'Node.js', 'Tailwind CSS'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: true
        },
        {
            id: 5,
            title: 'Restaurant Ordering System',
            description: 'An online food ordering system with a live menu, cart management, order tracking, and an admin panel for managing dishes and orders.',
            images: ['pics/pro1.jpg', 'pics/pro3.jpg', 'pics/pro2.jpg'],
            techStack: ['Asp.Net Core', 'JavaScript', 'Bootstrap'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: false
        },
        {
            id: 6,
            title: 'Real Estate Listing Site',
            description: 'A property listing platform with advanced search filters, image galleries, agent profiles, and inquiry forms.',
            images: ['pics/pro2.jpg', 'pics/pro4.jpg', 'pics/pro1.jpg'],
            techStack: ['Laravel', 'MySQL', 'jQuery', 'Bootstrap'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: false
        },
        {
            id: 7,
            title: 'Fitness Tracker',
            description: 'A workout and nutrition tracking app that lets users log exercises, monitor progress with charts, and set fitness goals.',
            images: ['pics/pro3.jpg', 'pics/pro2.jpg', 'pics/pro4.jpg'],
            techStack: ['JavaScript', 'HTML', 'CSS'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: false
        },
        {
            id: 8,
            title: 'Event Booking System',
            description: 'A ticket booking platform for events with seat selection, secure checkout, and QR-code based e-tickets.',
            images: ['pics/pro4.jpg', 'pics/pro1.jpg', 'pics/pro3.jpg'],
            techStack: ['Asp.Net Core', 'MySQL', 'Bootstrap'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: false
        },
        {
            id: 9,
            title: 'Learning Management System',
            description: 'An LMS for online courses featuring video lessons, quizzes, progress tracking, and certificates on completion.',
            images: ['pics/pro1.jpg', 'pics/pro4.jpg', 'pics/pro2.jpg'],
            techStack: ['Laravel', 'MySQL', 'JavaScript', 'Bootstrap'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: false
        },
        {
            id: 10,
            title: 'Weather Forecast App',
            description: 'A weather dashboard that pulls live data from a weather API, showing current conditions and a 7-day forecast by city.',
            images: ['pics/pro2.jpg', 'pics/pro3.jpg', 'pics/pro1.jpg'],
            techStack: ['JavaScript', 'HTML', 'CSS', 'API'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: false
        },
        {
            id: 11,
            title: 'Hospital Management System',
            description: 'A management system for clinics handling patient records, appointment scheduling, and doctor availability.',
            images: ['pics/pro3.jpg', 'pics/pro4.jpg', 'pics/pro1.jpg'],
            techStack: ['Asp.Net Core', 'MySQL', 'jQuery'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: false
        },
        {
            id: 12,
            title: 'Job Portal',
            description: 'A job listing and application platform connecting employers and job seekers, with resume uploads and application tracking.',
            images: ['pics/pro4.jpg', 'pics/pro3.jpg', 'pics/pro2.jpg'],
            techStack: ['Laravel', 'MySQL', 'Bootstrap', 'JavaScript'],
            liveLink: '#',
            githubLink: 'https://github.com/mohsin-gohar',
            featured: false
        }
    ];

    // =============================================================
    // SERVICES
    // =============================================================
    const servicesData = [
        {
            icon: 'fa-code',
            title: 'Web Development',
            description: 'Custom website development using HTML, CSS, JavaScript, and modern frameworks like Laravel & Asp.Net Core.'
        },
        {
            icon: 'fa-mobile-alt',
            title: 'Responsive Design',
            description: 'Mobile-first responsive websites that look and work perfectly on every device and screen size.'
        },
        {
            icon: 'fa-rocket',
            title: 'Performance Optimization',
            description: 'Speed optimization, SEO best practices, and clean code for a fast, search-friendly experience.'
        },
        {
            icon: 'fa-paint-brush',
            title: 'UI/UX Design',
            description: 'Beautiful, intuitive interfaces designed around real user experience and conversion.'
        },
        {
            icon: 'fa-database',
            title: 'Backend & APIs',
            description: 'Robust backend systems, REST APIs, and database design using Laravel and Asp.Net Core.'
        },
        {
            icon: 'fa-headset',
            title: 'Maintenance & Support',
            description: 'Ongoing support, bug fixes, and feature updates to keep your website running smoothly.'
        }
    ];

    // Expose as a single global namespace so every page (index.html,
    // projects.html, ...) can read the exact same data.
    window.PORTFOLIO_DATA = {
        skillsData: skillsData,
        projectsData: projectsData,
        servicesData: servicesData
    };
})();
