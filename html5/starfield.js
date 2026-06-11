// Calming Interactive Starfield
class Starfield {
  constructor() {
    this.canvas = document.getElementById('starfield');
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.cursor = null;
    
    this.init();
    this.animate();
  }

  init() {
    this.resize();
    this.createStars();
    this.setupEventListeners();
    this.createCursor();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createStars() {
    const starCount = Math.min(300, Math.floor((this.canvas.width * this.canvas.height) / 2000));
    
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        depth: Math.random() * 100,
        speed: Math.random() * 0.05 + 0.02,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }

  createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'cursor-indicator';
    document.body.appendChild(this.cursor);
  }

  setupEventListeners() {
    // Mouse movement
    document.addEventListener('mousemove', (e) => {
      this.targetX = (e.clientX / this.canvas.width) - 0.5;
      this.targetY = (e.clientY / this.canvas.height) - 0.5;
      
      if (this.cursor) {
        this.cursor.style.left = e.clientX + 'px';
        this.cursor.style.top = e.clientY + 'px';
        this.cursor.classList.add('active');
      }
    });

    // Touch support
    document.addEventListener('touchmove', (e) => {
      if (e.touches[0]) {
        this.targetX = (e.touches[0].clientX / this.canvas.width) - 0.5;
        this.targetY = (e.touches[0].clientY / this.canvas.height) - 0.5;
      }
    }, { passive: true });

    // Mouse leave
    document.addEventListener('mouseleave', () => {
      this.targetX = 0;
      this.targetY = 0;
      if (this.cursor) {
        this.cursor.classList.remove('active');
      }
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.resize();
      this.stars = [];
      this.createStars();
    });
  }

  animate() {
    // Smooth mouse following
    this.mouseX += (this.targetX - this.mouseX) * 0.05;
    this.mouseY += (this.targetY - this.mouseY) * 0.05;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.stars.forEach(star => {
      // Apply parallax effect based on mouse position
      const parallaxX = this.mouseX * star.depth * 0.3;
      const parallaxY = this.mouseY * star.depth * 0.3;
      
      // Update twinkle effect
      star.twinklePhase += star.twinkleSpeed;
      const twinkle = Math.sin(star.twinklePhase) * 0.2 + 0.8;
      
      // Draw star with gradient for glow effect
      const gradient = this.ctx.createRadialGradient(
        star.x + parallaxX,
        star.y + parallaxY,
        0,
        star.x + parallaxX,
        star.y + parallaxY,
        star.size * 3
      );
      
      const hue = 250 + Math.sin(star.twinklePhase * 0.5) * 20;
      const saturation = 50 + Math.sin(star.twinklePhase * 0.3) * 20;
      
      gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, 85%, ${star.opacity * twinkle})`);
      gradient.addColorStop(0.5, `hsla(${hue}, ${saturation}%, 70%, ${star.opacity * twinkle * 0.5})`);
      gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, 50%, 0)`);
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(
        star.x + parallaxX,
        star.y + parallaxY,
        star.size,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Starfield();
});