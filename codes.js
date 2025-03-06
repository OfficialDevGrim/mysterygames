function copyCode(code) {
    navigator.clipboard.writeText(code);

    let copyMessage = document.getElementById("copyMessage");
    copyMessage.textContent = `Copied: ${code}`;
    copyMessage.classList.add("show");

    setTimeout(() => {
        copyMessage.classList.remove("show");
    }, 2000);
}

function goBack() {
    window.location.href = "index.html";
}
const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let asteroids = [];

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2;
        this.opacity = Math.random();
        this.speed = Math.random() * 0.5 + 0.2;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) this.y = 0;
    }
}

class Asteroid {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 40 + 10;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    draw() {
        ctx.fillStyle = "gray";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
}

for (let i = 0; i < 100; i++) {
    stars.push(new Star());
}

for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    asteroids.forEach(asteroid => {
        asteroid.update();
        asteroid.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
