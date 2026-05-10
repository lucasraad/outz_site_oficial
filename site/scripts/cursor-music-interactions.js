// ===== ANIMAÇÕES DO CURSOR E NOTAS MUSICAIS - SITE OUTZ =====

class CursorMusicAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupMagneticCursor();
    this.setupCursorTrail();
    this.setupMusicalNotes();
    this.setupEnhancedHovers();
    this.setupFadeInAnimations();
    this.setupLogoFloat();
    this.setupTextGlow();
  }

  // ===== CURSOR MAGNÉTICO =====
  setupMagneticCursor() {
    // Apenas em desktop
    if (window.innerWidth <= 768) return;

    const cursor = document.createElement('div');
    cursor.className = 'magnetic-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Seguir o mouse
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animação suave do cursor
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Efeito magnético em elementos interativos
    const magneticElements = document.querySelectorAll('a, button, .menu-link');
    
    magneticElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });
  }

  // ===== TRAIL DE PARTÍCULAS =====
  setupCursorTrail() {
    if (window.innerWidth <= 768) return;

    let trails = [];
    
    document.addEventListener('mousemove', (e) => {
      // Limitar número de trails
      if (trails.length > 8) {
        const oldTrail = trails.shift();
        if (oldTrail.parentNode) {
          oldTrail.parentNode.removeChild(oldTrail);
        }
      }
      
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = e.clientX - 3 + 'px';
      trail.style.top = e.clientY - 3 + 'px';
      
      document.body.appendChild(trail);
      trails.push(trail);
      
      // Remover após animação
      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      }, 800);
    });
  }

  // ===== NOTAS MUSICAIS FLUTUANTES =====
  setupMusicalNotes() {
    const notes = ['♪', '♫', '♬', '♩', '♭', '♯', '𝄞'];
    
    // Criar container para as notas
    const notesContainer = document.createElement('div');
    notesContainer.className = 'musical-notes-container';
    document.body.appendChild(notesContainer);

    // Função para criar uma nota
    const createNote = () => {
      const note = document.createElement('div');
      note.className = 'musical-note';
      note.textContent = notes[Math.floor(Math.random() * notes.length)];
      
      // Posição aleatória horizontal
      note.style.left = Math.random() * 100 + '%';
      
      // Duração aleatória
      const duration = Math.random() * 4 + 6; // 6-10 segundos
      note.style.animationDuration = duration + 's';
      
      notesContainer.appendChild(note);
      
      // Remover após animação
      setTimeout(() => {
        if (note.parentNode) {
          note.parentNode.removeChild(note);
        }
      }, duration * 1000);
    };

    // Criar notas periodicamente
    setInterval(createNote, 2000); // Nova nota a cada 2 segundos
    
    // Criar algumas notas iniciais
    for (let i = 0; i < 3; i++) {
      setTimeout(createNote, i * 1000);
    }
  }

  // ===== EFEITOS DE HOVER MELHORADOS =====
  setupEnhancedHovers() {
    // Adicionar classe de hover melhorado aos elementos
    const hoverElements = document.querySelectorAll('button, .button-white, .button-orange, .section-img img, .top-banner-imagem');
    
    hoverElements.forEach(el => {
      el.classList.add('enhanced-hover');
    });

    // Efeito especial no logo principal
    const mainLogo = document.querySelector('.top-banner-imagem');
    if (mainLogo) {
      mainLogo.addEventListener('mouseenter', () => {
        mainLogo.classList.add('pulse-glow');
      });
      
      mainLogo.addEventListener('mouseleave', () => {
        mainLogo.classList.remove('pulse-glow');
      });
    }
  }

  // ===== ANIMAÇÕES DE FADE IN =====
  setupFadeInAnimations() {
    // Adicionar classes de animação aos elementos
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      const content = section.querySelector('.section-content');
      const img = section.querySelector('.section-img');
      
      if (content) {
        if (index % 2 === 0) {
          content.classList.add('fade-in-left');
        } else {
          content.classList.add('fade-in-right');
        }
      }
      
      if (img) {
        if (index % 2 === 0) {
          img.classList.add('fade-in-right');
        } else {
          img.classList.add('fade-in-left');
        }
      }
    });

    // Títulos com fade in up
    const titles = document.querySelectorAll('h2');
    titles.forEach(title => {
      title.classList.add('fade-in-up');
    });

    // Observer para ativar animações
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    // Observar todos os elementos com animação
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));
  }

  // ===== ANIMAÇÃO FLUTUANTE DO LOGO =====
  setupLogoFloat() {
    const mainLogo = document.querySelector('.top-banner-imagem');
    if (mainLogo) {
      mainLogo.classList.add('logo-float');
    }
  }

  // ===== EFEITO DE BRILHO NO TEXTO PRINCIPAL =====
  setupTextGlow() {
    const mainText = document.querySelector('#texto-principal');
    if (mainText) {
      mainText.classList.add('text-glow');
    }
  }
}

// ===== OTIMIZAÇÕES DE PERFORMANCE =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupThrottling();
    this.setupVisibilityAPI();
    this.setupReducedMotion();
  }

  // Throttling para eventos de mouse
  setupThrottling() {
    let ticking = false;
    
    const originalMouseMove = document.onmousemove;
    document.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Processar movimento do mouse
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Pausar animações quando a aba não está ativa
  setupVisibilityAPI() {
    document.addEventListener('visibilitychange', () => {
      const notesContainer = document.querySelector('.musical-notes-container');
      const cursor = document.querySelector('.magnetic-cursor');
      
      if (document.hidden) {
        if (notesContainer) notesContainer.style.display = 'none';
        if (cursor) cursor.style.display = 'none';
      } else {
        if (notesContainer) notesContainer.style.display = 'block';
        if (cursor) cursor.style.display = 'block';
      }
    });
  }

  // Respeitar preferências de movimento reduzido
  setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduced-motion');
    }
    
    prefersReducedMotion.addEventListener('change', () => {
      if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    });
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  // Aguardar um pouco para garantir que outros scripts carregaram
  setTimeout(() => {
    // Verificar se o usuário prefere movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      new CursorMusicAnimations();
    }
    
    new PerformanceOptimizer();
  }, 300);
});

// ===== LIMPEZA AO SAIR DA PÁGINA =====
window.addEventListener('beforeunload', () => {
  // Limpar elementos criados dinamicamente
  const cursor = document.querySelector('.magnetic-cursor');
  const notesContainer = document.querySelector('.musical-notes-container');
  const trails = document.querySelectorAll('.cursor-trail');
  
  if (cursor) cursor.remove();
  if (notesContainer) notesContainer.remove();
  trails.forEach(trail => trail.remove());
});

