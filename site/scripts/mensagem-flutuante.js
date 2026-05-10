const frases = [
  "MÚSICA AO VIVO",
  "CRIAR MOMENTOS ÚNICOS",
  "SABORES MARAVILHOSOS",
  "AUMENTAR A VISIBILIDADE",
  "CURTIR COM OS AMIGOS",
  "DESCOBRIR LUGARES",
  "FACILITAR A COMUNICAÇÃO"
];

function initFrasesFlutuantes() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const container = document.getElementById("frases-container");
  const section = document.getElementById("mensagem-section");
  const h2 = document.getElementById("texto-principal");
  if (!container || !section || !h2) return;

  function mostrarFrase() {
    const fraseTexto = frases[Math.floor(Math.random() * frases.length)];
    const frase = document.createElement("div");
    frase.classList.add("frase");
    frase.textContent = fraseTexto;

    const sectionWidth = section.clientWidth;
    const sectionHeight = section.clientHeight;

    const rect = h2.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();

    const forbidden = {
      left: rect.left - sectionRect.left,
      top: rect.top - sectionRect.top,
      right: rect.right - sectionRect.left,
      bottom: rect.bottom - sectionRect.top
    };

    let x, y;
    let tries = 0;

    do {
      x = Math.random() * (sectionWidth - 200);
      y = Math.random() * (sectionHeight - 50);
      tries++;
      if (tries > 50) break;
    } while (
      x > forbidden.left - 150 &&
      x < forbidden.right + 20 &&
      y > forbidden.top - 50 &&
      y < forbidden.bottom + 20
    );

    frase.style.left = `${x}px`;
    frase.style.top = `${y}px`;

    container.appendChild(frase);

    setTimeout(() => (frase.style.opacity = 1), 50);

    setTimeout(() => {
      frase.style.opacity = 0;
      setTimeout(() => frase.remove(), 1000);
    }, 3000);
  }

  setInterval(mostrarFrase, 2000);
}

document.addEventListener("DOMContentLoaded", initFrasesFlutuantes);
