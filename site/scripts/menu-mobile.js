document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('mobile-menu-toggle');
    const mobile_menu = document.getElementById('mobile-menu');
    const menu_overlay = document.getElementById('menu-mobile-open');
    const body = document.body; // Referência ao body

    // Alternar menu, overlay e scroll
    hamburger.addEventListener('click', () => {
        const isOpen = mobile_menu.classList.toggle('active');
        hamburger.classList.toggle('open');
        menu_overlay.classList.toggle('active', isOpen);
        body.style.overflow = isOpen ? 'hidden' : 'auto';
    });

    // Fechar o menu ao clicar em um link
    const menuLinks = mobile_menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobile_menu.classList.remove('active');
            hamburger.classList.remove('open');
            menu_overlay.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // Fechar o menu ao clicar no overlay
    menu_overlay.addEventListener('click', () => {
        mobile_menu.classList.remove('active');
        hamburger.classList.remove('open');
        menu_overlay.classList.remove('active');
        body.style.overflow = 'auto';
    });
});