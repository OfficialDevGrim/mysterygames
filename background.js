const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, speedX, speedY, size) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.size = size;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "cyan";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "cyan";
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
        let size = Math.random() * 3 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = (Math.random() - 0.5) * 2;
        particles.push(new Particle(x, y, speedX, speedY, size));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animate();
