// const glow = document.getElementById("cursor-glow");

// let mouseX = 0;
// let mouseY = 0;

// document.addEventListener("mousemove", (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
// });

// // Animación fluida
// function animateGlow() {
//     glow.style.transform = `translate(${mouseX-125}px, ${mouseY-125}px)`;
//     requestAnimationFrame(animateGlow);
// }

// animateGlow();

// const glow = document.getElementById("cursor-glow");

// let mouseX = 0;
// let mouseY = 0;
// let glowX = 0;
// let glowY = 0;

// document.addEventListener("mousemove", (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
// });

// function animateGlow() {
//     // "lerp" para movimiento suave
//     glowX += (mouseX - glowX) * 0.12; // velocidad de suavidad 0.1–0.2 recomendado
//     glowY += (mouseY - glowY) * 0.12;

//     // centrar el glow según su tamaño (125px = la mitad de 250px)
//     glow.style.transform = `translate(${glowX - 125}px, ${glowY - 125}px)`;

//     requestAnimationFrame(animateGlow);
// }

// animateGlow();


const glow = document.getElementById("cursor-glow");
const particlesContainer = document.getElementById("particles-container");

// Seguimiento del glow
let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;
let isExploding = false;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    if (!isExploding) {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        glow.style.transform = `translate(${glowX - 125}px, ${glowY - 125}px)`;
    }
    requestAnimationFrame(animateGlow);
}
animateGlow();


// --- EXPLOSIÓN DE PARTÍCULAS ---
function explodeGlow(x, y) {
    isExploding = true;

    // Oculta el glow mientras explota
    glow.style.opacity = "0";

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        particlesContainer.appendChild(particle);

        // Posición inicial donde estaba el glow
        particle.style.left = `${x - 5}px`;
        particle.style.top = `${y - 5}px`;

        // Dirección random para la explosión
        const angle = Math.random() * 2 * Math.PI;
        const distance = 80 + Math.random() * 60;

        const finalX = x + Math.cos(angle) * distance;
        const finalY = y + Math.sin(angle) * distance;

        // Animación
        particle.animate(
            [
                { transform: "translate(0, 0)", opacity: 1 },
                { transform: `translate(${finalX - x}px, ${finalY - y}px)`, opacity: 0 }
            ],
            {
                duration: 900 + Math.random() * 500,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        // Eliminar partícula después
        setTimeout(() => particle.remove(), 1500);
    }

    // Regenerar glow después de 2 segundos
    setTimeout(() => {
        isExploding = false;
        glow.style.opacity = "1";
    }, 2000);
}


// Click para explotar
document.addEventListener("click", () => {
    explodeGlow(glowX, glowY);
});
