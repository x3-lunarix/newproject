// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 15 + 5;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.bottom = `-${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Random shapes
        if (i % 4 === 0) {
            particle.style.borderRadius = '0';
            particle.style.transform = 'rotate(45deg)';
            particle.style.background = 'rgba(255, 77, 166, 0.5)';
        } else if (i % 3 === 0) {
            particle.style.borderRadius = '50% 50% 0 50%';
            particle.style.background = 'rgba(209, 0, 104, 0.5)';
        }
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

// Download functionality
function setupDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Fetch download links from the text file
    fetch('download-link.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            let downloadUrl = '';
            
            // Find the first valid download URL
            for (const line of lines) {
                if (line.trim() && !line.startsWith('#')) {
                    const parts = line.split('|');
                    if (parts.length >= 2 && parts[1].trim().startsWith('http')) {
                        downloadUrl = parts[1].trim();
                        break;
                    }
                }
            }
            
            if (downloadUrl) {
                downloadBtn.href = downloadUrl;
                downloadBtn.setAttribute('download', '');
            }
        })
        .catch(error => {
            console.error('Error fetching download links:', error);
        });
    
    downloadBtn.addEventListener('click', function(e) {
        if (!this.href || this.href === '#' || this.href === window.location.href) {
            e.preventDefault();
            
            // Create a beautiful download animation
            const originalHtml = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing download...';
            this.style.opacity = '0.8';
            this.style.pointerEvents = 'none';
            
            // Simulate download process
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Download Complete!';
                this.style.background = 'linear-gradient(to right, #00c853, #009624)';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalHtml;
                    this.style.background = '';
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                }, 3000);
            }, 2000);
        }
    });
}

// Music player functionality
function setupMusicPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    let isPlaying = false;
    
    // Try to play music when user interacts with the page
    document.body.addEventListener('click', function() {
        if (!isPlaying && audio.paused) {
            audio.play().then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(e => {
                console.log("Audio play failed: ", e);
            });
        }
    });
    
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    volumeSlider.addEventListener('input', function() {
        audio.volume = volumeSlider.value;
    });
    
    // Set initial volume
    audio.volume = volumeSlider.value;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    setupSmoothScrolling();
    setupDownloadButton();
    setupMusicPlayer();
    
    // Add animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature, .exam-card, .download-container, .about-content > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});
