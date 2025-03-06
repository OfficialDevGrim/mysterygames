document.addEventListener("DOMContentLoaded", () => {
    const glitchTexts = document.querySelectorAll(".glitch-text");
    const cards = document.querySelectorAll(".card");
    const container = document.getElementById("three-container");

    // 3D Glitch Effect
    glitchTexts.forEach(text => {
        setInterval(() => {
            text.style.transform = `translate(${Math.random() * 2}px, ${Math.random() * 2}px) rotateX(${Math.random() * 5}deg) rotateY(${Math.random() * 5}deg)`;
        }, 100);
    });

    // Mouse Move Parallax
    document.addEventListener("mousemove", (e) => {
        let x = (window.innerWidth / 2 - e.clientX) / 50;
        let y = (window.innerHeight / 2 - e.clientY) / 50;
        
        glitchTexts.forEach(text => {
            text.style.transform = `perspective(500px) rotateX(${y}deg) rotateY(${x}deg)`;
        });

        cards.forEach(card => {
            card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg)`;
        });
    });

    // 3D Animated Background
    let scene, camera, renderer, cube;
    
    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        let geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        let material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 50;
        animate();
    }

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    init();
});
