// Main JavaScript for the portfolio website

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    setupMobileMenu();
    
    // Populate projects
    populateProjects();
    
    // Populate skills
    populateSkills();
    
    // Setup contact form
    setupContactForm();
});

// Mobile menu functionality
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }
}

// Populate projects section
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid || !projectsData) return;
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const tagsHTML = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Populate skills section
function populateSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid || !skillsData) return;
    
    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        
        skillCard.innerHTML = `
            <div class="skill-icon">
                <img src="${skill.icon}" alt="${skill.name}">
            </div>
            <h3 class="skill-name">${skill.name}</h3>
            <p class="skill-description">${skill.description}</p>
        `;
        
        skillsGrid.appendChild(skillCard);
    });
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For now, just log it and show a success message
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}