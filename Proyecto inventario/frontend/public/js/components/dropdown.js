
const btn = document.getElementById('profileBtn');
const menu = document.getElementById('dropdownMenu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Opcional: cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
    }
});
