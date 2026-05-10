function animateOnScroll() {
    const sections = document.querySelectorAll('.section-with-image');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        sections.forEach(section => {
            const img = section.querySelector('.section-img');
            if (img) img.classList.add('show');
        });
        return;
    }

    function checkScroll() {
        sections.forEach(section => {
            const img = section.querySelector('.section-img');
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (img && sectionTop < windowHeight - 300) {
                img.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

window.addEventListener("load", animateOnScroll);
