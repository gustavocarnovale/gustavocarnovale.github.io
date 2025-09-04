// Inicialización de Firebase
const db = firebase.database();

// Función para suavizar el scroll entre secciones
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Función para agregar animaciones de entrada
function addFadeInAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Función para cerrar el menú móvil al hacer clic en un enlace
function closeMobileMenu() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
    }
}

// Variables para el header inteligente
let lastScrollTop = 0;
let header = null;

// Función para el header inteligente
function initSmartHeader() {
    header = document.querySelector('.navbar');
    if (header) {
        header.classList.add('navbar-smart');
    }
}

// Función para manejar el scroll del header
function handleHeaderScroll() {
    if (!header) return;
    
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        // Scroll hacia abajo - ocultar header
        header.classList.add('navbar-hidden');
    } else {
        // Scroll hacia arriba - mostrar header
        header.classList.remove('navbar-hidden');
    }
    
    lastScrollTop = currentScrollTop;
}

// Inicialización cuando la página carga
window.onload = (event) => {
    // Inicializar header inteligente
    initSmartHeader();
    
    // Contador de visitantes
    db.ref('visits').once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const visitCount = Object.keys(data).length;
            document.getElementById('muestraVisita').value = visitCount;
        }
    });

    // Agregar nueva visita
    db.ref('visits').push({
        timestamp: Date.now(),
        userAgent: navigator.userAgent
    });

    // Configurar navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            closeMobileMenu();
        });
    });

    // Agregar animaciones
    addFadeInAnimation();

    // Efecto de hover mejorado para las redes sociales
    document.querySelectorAll('.sobreGit, .sobreLink, .sobreWhats').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Validación del formulario
    const form = document.querySelector('form[name="contact"]');
    if (form) {
        form.addEventListener('submit', function(e) {
            const email = this.querySelector('input[name="email"]').value;
            const name = this.querySelector('input[name="name"]').value;
            const message = this.querySelector('textarea[name="message"]').value;

            if (!email || !name || !message) {
                e.preventDefault();
                alert('Por favor, completa todos los campos del formulario.');
                return false;
            }

            // Mostrar mensaje de confirmación
            alert('¡Gracias por tu mensaje! Te contactaré pronto.');
        });
    }
};

// Event listener para el scroll
window.addEventListener('scroll', handleHeaderScroll, { passive: true });

