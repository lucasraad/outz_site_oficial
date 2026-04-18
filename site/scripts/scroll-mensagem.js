let scrolled = false;
const mensagemSection = document.getElementById('mensagem-section');
const mensagemSectionTop = mensagemSection.offsetTop;
const mensagemSectionHeight = mensagemSection.offsetHeight;
const centerOffset = mensagemSectionTop + (mensagemSectionHeight / 2) - (window.innerHeight / 2);

window.addEventListener('scroll', function () {
    // Verifica se o usuário está no topo da página
    if (!scrolled && window.scrollY < 500) {
        scrolled = true;

        window.scrollTo({
            top: centerOffset,
            behavior: 'smooth'
        });
    } else if (window.scrollY > 500) {
        scrolled = true;
    }
});
