// Background animations for the portfolio

// Starfield background
function initStarfield() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const stars = [];
    const numStars = 100;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Create stars
    function createStars() {
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                speed: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    // Animate stars
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Move star
            star.y += star.speed;
            
            // Reset star position if it goes off screen
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        }
        
        requestAnimationFrame(animateStars);
    }
    
    // Initialize
    resizeCanvas();
    createStars();
    animateStars();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        stars.length = 0;
        createStars();
    });
}

// Matrix rain effect
function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>/?';
    const fontSize = 14;
    const columns = [];
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initColumns();
    }
    
    // Initialize columns
    function initColumns() {
        columns.length = 0;
        const columnCount = Math.floor(canvas.width / fontSize);
        
        for (let i = 0; i < columnCount; i++) {
            columns[i] = Math.floor(Math.random() * canvas.height / fontSize) * -1;
        }
    }
    
    // Draw matrix rain
    function drawMatrixRain() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < columns.length; i++) {
            const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(randomChar, i * fontSize, columns[i] * fontSize);
            
            if (columns[i] * fontSize > canvas.height && Math.random() > 0.975) {
                columns[i] = 0;
            }
            
            columns[i]++;
        }
        
        setTimeout(() => requestAnimationFrame(drawMatrixRain), 50);
    }
    
    // Initialize
    resizeCanvas();
    drawMatrixRain();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
}

// Particle effect
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Create particles
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1
            });
        }
    }
    
    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Move particle
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    // Initialize
    resizeCanvas();
    createParticles();
    animateParticles();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        particles.length = 0;
        createParticles();
    });
}

// Initialize all background effects
window.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initMatrixRain();
    initParticles();
});