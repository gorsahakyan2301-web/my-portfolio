window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#bg3d');
    if (!canvas || typeof THREE === 'undefined') {
        console.error("Three.js library or Canvas element not found!");
        return;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const particlesCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.8
    });
    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);
    camera.position.z = 4;
    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 0.5;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    });
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += (mouseX - particlesMesh.rotation.y) * 0.05;
        particlesMesh.rotation.x += (mouseY - particlesMesh.rotation.x) * 0.05;

        renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});