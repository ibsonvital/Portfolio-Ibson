/* ----------------------------------------------------------- */
/* --- 1. CONTROLE DO MENU MOBILE (Hambúrguer) --- */
/* ----------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('#main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            
            // Troca o ícone de barras para um "X" quando aberto
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    /* ----------------------------------------------------------- */
    /* --- 2. INICIALIZAÇÃO DOS SLIDERS (Dashboards) --- */
    /* ----------------------------------------------------------- */
    console.log("Verificando seletores de slider...");
    
    // Inicializa o slider de Vendas
    initializeSlider('[data-slider="vendas"]');
    
    // Inicializa o slider de Logística
    initializeSlider('[data-slider="logistica"]');
});

/* ----------------------------------------------------------- */
/* --- 3. FUNÇÃO PRINCIPAL DO SLIDER --- */
/* ----------------------------------------------------------- */
function initializeSlider(selector) {
    const projectContainer = document.querySelector(selector);
    
    // Se não encontrar o container, avisa no console e para
    if (!projectContainer) {
        console.warn("Aviso: Container não encontrado para o seletor:", selector);
        return;
    }

    const track = projectContainer.querySelector('.local-slider-track');
    const slides = projectContainer.querySelectorAll('.local-slide');
    const leftBtn = projectContainer.querySelector('.local-left');
    const rightBtn = projectContainer.querySelector('.local-right');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Função que move a "trilha" das imagens
    function updateSlider() {
        // Como sua track no CSS tem 200%, cada slide ocupa 50% dela.
        // Logo, movemos de 50 em 50 para trocar a imagem.
        const offset = currentSlide * -50; 
        track.style.transform = `translateX(${offset}%)`;

        // Ajusta a opacidade das setas para indicar limite
        if (leftBtn) {
            leftBtn.style.opacity = (currentSlide === 0) ? "0.3" : "1";
            leftBtn.style.cursor = (currentSlide === 0) ? "default" : "pointer";
        }
        if (rightBtn) {
            rightBtn.style.opacity = (currentSlide === totalSlides - 1) ? "0.3" : "1";
            rightBtn.style.cursor = (currentSlide === totalSlides - 1) ? "default" : "pointer";
        }
    }

    // Configura os eventos de clique
    if (leftBtn && rightBtn) {
        leftBtn.onclick = (e) => {
            e.preventDefault();
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        };

        rightBtn.onclick = (e) => {
            e.preventDefault();
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlider();
            }
        };

        // Define o estado inicial (seta esquerda apagada)
        updateSlider();
        console.log(`Slider ${selector} configurado com sucesso!`);
    }
}

/* ----------------------------------------------------------- */
/* --- 4. EFEITO DE REVELAR AO ROLAR (Scroll Reveal) --- */
/* ----------------------------------------------------------- */
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
});