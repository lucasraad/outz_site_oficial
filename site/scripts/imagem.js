function animateOnScroll() {
    const sections = document.querySelectorAll('.section-with-image');

    function checkScroll() {
        sections.forEach(section => {
            const img = section.querySelector('.section-img'); // Tenta encontrar a imagem
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (img && sectionTop < windowHeight - 300) { // Só adiciona classe se a imagem existir
                img.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

window.addEventListener("load", animateOnScroll);
