document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lógica do Menu Mobile ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
        });

        // Fechar o menu ao clicar em um link
        document.querySelectorAll('#main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- 2. Lógica dos Sliders Locais (Dashboards) ---
    function initializeSlider(projectId) {
        const projectContainer = document.getElementById(projectId);
        // Verifica se o container existe antes de tentar inicializar
        if (!projectContainer) return; 

        const track = projectContainer.querySelector('.local-slider-track');
        // Usa querySelectorAll para garantir que está pegando todos os slides
        const slides = projectContainer.querySelectorAll('.local-slide'); 
        const leftBtn = projectContainer.querySelector('.local-left');
        const rightBtn = projectContainer.querySelector('.local-right');
        
        let currentSlide = 0;
        const totalSlides = slides.length;

        function updateSlider() {
            // Se houver 2 slides, cada um tem 50% de largura
            const offset = currentSlide * -50; 
            track.style.transform = `translateX(${offset}%)`;

            // Habilitar/Desabilitar botões
            if (leftBtn) leftBtn.disabled = currentSlide === 0;
            if (rightBtn) rightBtn.disabled = currentSlide === totalSlides - 1;
        }

        if (leftBtn && rightBtn) {
            leftBtn.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            });

            rightBtn.addEventListener('click', () => {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                    updateSlider();
                }
            });

            // Inicializa o slider na posição correta (primeiro slide)
            updateSlider();
        }
    }

    // Inicializa cada um dos seus projetos de dashboard
    initializeSlider('vendas-project');
    initializeSlider('logistica-project');
    initializeSlider('operacional-project');


    // --- 3. Lógica da Animação Reveal on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, 
        threshold: 0.1, 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('hidden'); // Garante que todos comecem ocultos
        observer.observe(el);
    });

    // --- 4. Lógica do Formulário (Exemplo) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            if (formMessage) {
                formMessage.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
            }
            contactForm.reset();
        });
    }

});