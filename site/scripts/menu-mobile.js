(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.getElementById('mobile-menu-toggle');
        const menu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('menu-mobile-open');
        if (!toggle || !menu || !overlay) return;

        let previousOverflow = '';
        const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
        function setOpen(open, restoreFocus = false) {
            if (open === isOpen()) return;
            if (open) previousOverflow = document.body.style.overflow;
            menu.classList.toggle('active', open);
            toggle.classList.toggle('open', open);
            overlay.classList.toggle('active', open);
            menu.inert = !open;
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            document.body.style.overflow = open ? 'hidden' : previousOverflow;
            if (open) menu.querySelector('a')?.focus();
            else if (restoreFocus) toggle.focus();
        }

        toggle.addEventListener('click', () => setOpen(!isOpen()));
        overlay.addEventListener('click', () => setOpen(false, true));
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setOpen(false, true));
        });
        document.addEventListener('keydown', event => {
            if (!isOpen()) return;
            if (event.key === 'Escape') {
                event.preventDefault();
                setOpen(false, true);
            } else if (event.key === 'Tab') {
                const controls = [toggle, ...menu.querySelectorAll('a[href], button:not(:disabled)')];
                const current = controls.indexOf(document.activeElement);
                const next = event.shiftKey
                    ? (current <= 0 ? controls.length - 1 : current - 1)
                    : (current + 1) % controls.length;
                event.preventDefault();
                controls[next].focus();
            }
        });
        window.matchMedia('(max-width: 768px)').addEventListener('change', event => {
            if (!event.matches) setOpen(false);
        });
    });
})();
