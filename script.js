// script.js — validação do formulário, menu toggle e reveal ao rolar

document.addEventListener('DOMContentLoaded', function () {
  // 1) Menu mobile toggle
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !expanded);
      // alterna visibilidade do menu (simples)
      nav.querySelector('ul').style.display = expanded ? 'none' : 'flex';
    });
  }

  // 2) Formulário de contato — validação simples
  const form = document.getElementById('contact-form');
  const msgEl = document.getElementById('form-message');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      // Validações básicas
      if (nome.length < 2) {
        showMessage('Por favor informe seu nome completo.', 'red');
        return;
      }
      if (!validateEmail(email)) {
        showMessage('Por favor informe um e-mail válido.', 'red');
        return;
      }
      if (mensagem.length < 10) {
        showMessage('Escreva uma mensagem com pelo menos 10 caracteres.', 'red');
        return;
      }

      // Se tudo ok: simula envio
      showMessage('Mensagem enviada com sucesso! Obrigado, entrarei em contato.', 'green');
      form.reset();
    });
  }

  function validateEmail(email) {
    // regex simples para e-mail
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(text, color) {
    if (!msgEl) return;
    msgEl.textContent = text;
    msgEl.style.color = color;
    // remove depois de 6s
    setTimeout(() => {
      msgEl.textContent = '';
    }, 6000);
  }

  // 3) Reveal on scroll (classes .reveal .hidden)
  const revealItems = document.querySelectorAll('.reveal.hidden');
  const revealOnScroll = () => {
    const offset = window.innerHeight * 0.85;
    revealItems.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < offset) {
        el.classList.remove('hidden');
        // opcional: animação simples
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      } else {
        // mantém hidden caso queira replay ao scroll (opcional)
        el.style.opacity = 0;
        el.style.transform = 'translateY(12px)';
      }
    });
  };

  // Inicializa estado (seta opacity 0 para itens .hidden)
  revealItems.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(12px)';
  });

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

});
