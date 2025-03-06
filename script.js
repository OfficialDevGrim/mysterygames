document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("animated-bg");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let points = [];
    const numPoints = 50;

    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2
        });
    }

    function drawLines() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

            ctx.fillStyle = "cyan";
            ctx.fillRect(p.x, p.y, 3, 3);
        }

        requestAnimationFrame(drawLines);
    }

    drawLines();
});
