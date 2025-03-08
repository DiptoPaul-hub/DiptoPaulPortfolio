// Ensure DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Smooth Scroll Functionality
        const links = document.querySelectorAll('.navbar a');
        links.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Highlight Active Section in Navbar
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 60;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.navbar a').forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        });

        // GSAP Animations for Sections
        const sections = document.querySelectorAll(".section");
        sections.forEach(section => {
            gsap.from(section.children, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.3,
                ease: "power3.out"
            });
        });
    } else {
        console.error('GSAP or ScrollTrigger not loaded. Animations will not work.');
    }

    // Load About Text
    const aboutTextElement = document.getElementById('about-text');
    if (aboutTextElement) {
        const aboutText = localStorage.getItem('aboutText') || `
            I’m a dedicated and aspiring creative with a passion for web development, graphic design, photography, and videography. As the founder of Lavish Studio, I specialize in delivering visually stunning and functional solutions for clients.
            My goal is to excel in every project I take on, driven by positivity and a strong analytical mindset. With expertise in problem-solving, project management, and cross-cultural communication, I’m ready to bring your ideas to life!
        `;
        aboutTextElement.innerHTML = aboutText.replace(/\n/g, '<br>');
    } else {
        console.error('Element with ID "about-text" not found.');
    }

    // Load Skills
    const skillsList = document.getElementById('about-skills');
    if (skillsList) {
        let skills;
        try {
            skills = JSON.parse(localStorage.getItem('skills') || '["Graphic Design", "Web Development (HTML, CSS, JS)", "Photography & Videography", "Project Management", "Problem-Solving"]');
        } catch (e) {
            console.error('Error parsing skills from localStorage:', e);
            skills = ["Graphic Design", "Web Development (HTML, CSS, JS)", "Photography & Videography", "Project Management", "Problem-Solving"];
        }
        skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });
    } else {
        console.error('Element with ID "about-skills" not found.');
    }

    // Load Services (Static for simplicity)
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        const services = [
            { title: "Web Development", description: "Building responsive, user-friendly websites using HTML, CSS, JavaScript, and modern frameworks." },
            { title: "Graphic Design", description: "Creating stunning visuals and branding materials using tools like Adobe Photoshop and Illustrator." },
            { title: "Photography & Videography", description: "Capturing moments and crafting stories through high-quality photography and video production." },
            { title: "Creative Consulting", description: "Offering strategic insights for marketing, branding, and digital presence enhancement." }
        ];
        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `<h3>${service.title}</h3><p>${service.description}</p>`;
            servicesGrid.appendChild(card);
        });
    } else {
        console.error('Element with ID "services-grid" not found.');
    }

    // Load Portfolio Items
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid) {
        let portfolioItems;
        try {
            portfolioItems = JSON.parse(localStorage.getItem('portfolioItems') || `[
                {"title": "Sodium Ion Battery Project", "description": "1st Runner Up at DRMC National Science & Codeavour Carnival 2024", "image": "https://via.placeholder.com/400x300"},
                {"title": "Geotextile & Carbon Mitigation", "description": "1st Position at MEMS Science Fest 2023", "image": "https://via.placeholder.com/400x300"},
                {"title": "Lavish Studio Branding", "description": "Creative branding for my studio, including web and visual design.", "image": "https://via.placeholder.com/400x300"}
            ]`);
        } catch (e) {
            console.error('Error parsing portfolioItems from localStorage:', e);
            portfolioItems = [
                {"title": "Sodium Ion Battery Project", "description": "1st Runner Up at DRMC National Science & Codeavour Carnival 2024", "image": "https://via.placeholder.com/400x300"},
                {"title": "Geotextile & Carbon Mitigation", "description": "1st Position at MEMS Science Fest 2023", "image": "https://via.placeholder.com/400x300"},
                {"title": "Lavish Studio Branding", "description": "Creative branding for my studio, including web and visual design.", "image": "https://via.placeholder.com/400x300"}
            ];
        }
        portfolioItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'portfolio-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="#" class="portfolio-link">View Details</a>
                </div>
            `;
            portfolioGrid.appendChild(div);
        });
    } else {
        console.error('Element with ID "portfolio-grid" not found.');
    }

    // Load Testimonials (Static for simplicity)
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (testimonialsGrid) {
        const testimonials = [
            { text: "Dipto’s creativity and professionalism are unmatched. He delivered a stunning website for my business!", author: "Client Name" },
            { text: "His photography captured the essence of our event perfectly. Highly recommend!", author: "Event Organizer" }
        ];
        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `<p>"${testimonial.text}"</p><h4>- ${testimonial.author}</h4>`;
            testimonialsGrid.appendChild(card);
        });
    } else {
        console.error('Element with ID "testimonials-grid" not found.');
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            console.log('Form Submitted:', data);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    } else {
        console.error('Element with ID "contactForm" not found.');
    }
});