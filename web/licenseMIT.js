document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.footer').style.opacity = 1; // Hacer visible el footer después de 1.5 segundos
    }, 1500); // 1.5 segundos de retraso

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });
});
