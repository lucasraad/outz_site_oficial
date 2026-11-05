(() => {
function initMessageAnimation() {
    const section = document.getElementById("mensagem-section");
    const textElement = section?.querySelector("h2");
    if (!textElement) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const text = textElement.innerText; // Obtém o texto completo
    textElement.innerText = ""; // Esvazia o conteúdo para iniciar o efeito
    let index = 0;
    let started = false;

    function typeText() {
        if (index < text.length) {
            textElement.textContent += text[index]; // Adiciona uma letra por vez
            index++;
            setTimeout(typeText, 40); // Ajuste o tempo entre cada letra (em milissegundos)
        }
    }

    function checkScroll() {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (!started && sectionTop < windowHeight * 0.85) {
            started = true;
            typeText();
            window.removeEventListener("scroll", checkScroll); // Remove o listener após iniciar
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Verifica se a seção já está visível ao carregar
}

window.addEventListener("load", initMessageAnimation);
})();
