function scrollMenu() {
    const menu = document.getElementById('menu-section');
    const menu_logo = document.getElementById('header-logo-div');
    const logo_white = document.getElementById('logo-white');
    const logo_dark = document.getElementById('logo-dark');
    const menu_links = document.getElementById('menu-itens');
    const top_banner = document.getElementById('top-banner-section');
    const section = document.getElementById('mensagem-section');
    const menu_mobile = document.getElementById('mobile-menu-toggle');
    let last_scroll_state = '';
    let menuShouldStayVisible = false;

    logo_dark.style.display = 'none';

    // Função para adicionar ou remover classes
    function toggleClasses(add) {
        menu.classList.toggle('scroll-menu', add);
        menu_logo.classList.toggle('scroll-menu-logo', add);
        menu_links.classList.toggle('scroll-menu-links', add);
        menu_mobile.classList.toggle('scroll-mobile-menu', add);
    }

    // Atualiza o estado do menu durante o scroll
    function animateMenu() {
        const sectionRect = section.getBoundingClientRect();
        const bannerRect = top_banner.getBoundingClientRect();

        const isMobile = window.innerWidth <= 768;
        const isPastBanner30 = bannerRect.bottom <= window.innerHeight * (isMobile ? .4 : .7);
        const isSectionAtTop = sectionRect.top <= 0 && sectionRect.bottom > 0;

        if (isSectionAtTop) {
            // Quando a mensagem-section atinge o topo
            if (last_scroll_state !== 'section-at-top') {
                last_scroll_state = 'section-at-top';
                logo_white.style.display = 'none';
                logo_dark.style.display = 'block';
                menuShouldStayVisible = true;
                toggleClasses(true);
                menu.style.transform = "translateY(0)";
            }
        } else if (isPastBanner30 && !menuShouldStayVisible) {
            // Quando passar de 30% do top-banner-section e o menu não deve permanecer visível
            if (last_scroll_state !== 'past-banner') {
                last_scroll_state = 'past-banner';
                menu.style.transform = "translateY(-100%)";
                setTimeout(() => {
                    if (last_scroll_state === 'past-banner') toggleClasses(false);
                }, 400);
            }
        } else if (!isPastBanner30 && !menuShouldStayVisible) {
            // Voltar ao estado original (topo do site)
            if (last_scroll_state !== 'default') {
                last_scroll_state = 'default';
                logo_dark.style.display = 'none';
                logo_white.style.display = 'block';
                toggleClasses(false);
                menu.style.transform = "translateY(0)";
            }
        }

        // Caso o menu deva permanecer visível
        if (menuShouldStayVisible) {
            menu.style.transform = "translateY(0)";
        }
    }

    // Detecta quando o usuário faz scroll para cima
    function handleScrollUp() {
        const currentScroll = window.pageYOffset;

        // Se o usuário voltar para cima e atingir o topo, redefine o estado
        if (currentScroll < top_banner.offsetHeight) {
            menuShouldStayVisible = false; // Menu volta ao comportamento original
        }
    }

    // Verifica a posição inicial do scroll
    function checkInitialScrollPosition() {
        const sectionRect = section.getBoundingClientRect();
        const currentScroll = window.pageYOffset;

        // Verifica se a mensagem-section está visível ou se o scroll está abaixo dela
        if (sectionRect.top <= 0 || currentScroll > section.offsetTop) {
            menuShouldStayVisible = true;
            logo_white.style.display = 'none';
            logo_dark.style.display = 'block';
            toggleClasses(true);
            menu.style.transform = "translateY(0)";
        }
    }

    document.addEventListener('scroll', animateMenu);
    document.addEventListener('scroll', handleScrollUp);
    checkInitialScrollPosition(); // Verifica a posição inicial do scroll
}

// Garante que o código seja executado após o DOM estar completamente carregado
window.addEventListener("load", scrollMenu);