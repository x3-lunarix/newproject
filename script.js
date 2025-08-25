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

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const downloadBtn = document.getElementById('downloadBtn');
    let isPlaying = false;
    
    // Try to play music when user interacts with the page
    document.body.addEventListener('click', function() {
        if (!isPlaying) {
            audio.play().catch(e => {
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
    
    // Download button functionality
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a beautiful download animation
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        downloadBtn.style.opacity = '0.8';
        downloadBtn.style.pointerEvents = 'none';
        
        // Simulate download process
        setTimeout(() => {
            // In a real implementation, this would download the file
            // For now, we'll show a success message
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> Download Complete!';
            downloadBtn.style.background = 'linear-gradient(to right, #00c853, #009624)';
            
            // Reset after 3 seconds
            setTimeout(() => {
                downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Now';
                downloadBtn.style.background = 'linear-gradient(to right, #d10068, #8a0038)';
                downloadBtn.style.opacity = '1';
                downloadBtn.style.pointerEvents = 'auto';
            }, 3000);
        }, 2000);
    });
});
