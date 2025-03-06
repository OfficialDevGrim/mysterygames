function goBack() {
    window.history.back();
}

function showStaffMessage() {
    // Hide both application boxes
    document.getElementById("partner-box").classList.add("hidden");
    document.getElementById("staff-box").classList.add("hidden");

    // Show the staff closed message
    setTimeout(() => {
        document.getElementById("staff-message").classList.add("show");
    }, 300);
}

function resetView() {
    // Show both application boxes again
    document.getElementById("partner-box").classList.remove("hidden");
    document.getElementById("staff-box").classList.remove("hidden");

    // Hide the staff closed message
    document.getElementById("staff-message").classList.remove("show");
}
// Galaxy + Shooting Stars Effect
const canvas = document.getElementById("galaxyCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Galaxy Stars
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 1000;
const positions = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 500;
}

starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// Shooting Stars
const shootingStars = [];
const shootingStarMaterial = new THREE.MeshBasicMaterial({ color: 0xfffaaa });

function createShootingStar() {
    const shootingStarGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const shootingStar = new THREE.Mesh(shootingStarGeometry, shootingStarMaterial);

    shootingStar.position.set(Math.random() * 100 - 50, Math.random() * 50, -50);
    scene.add(shootingStar);
    shootingStars.push({ star: shootingStar, speed: Math.random() * 1.5 + 0.5 });
}

// Create multiple shooting stars
for (let i = 0; i < 5; i++) createShootingStar();

// Animation Loop
function animate() {
    starField.rotation.y += 0.0005;

    shootingStars.forEach((obj, index) => {
        obj.star.position.x -= obj.speed;
        obj.star.position.y -= obj.speed * 0.6;

        if (obj.star.position.x < -50 || obj.star.position.y < -25) {
            scene.remove(obj.star);
            shootingStars.splice(index, 1);
            createShootingStar();
        }
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// Resize Handler
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

camera.position.z = 100;
animate();
