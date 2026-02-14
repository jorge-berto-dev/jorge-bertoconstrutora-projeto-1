// ===== INICIALIZAÇÃO DO AOS =====
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ===== HEADER TRANSPARENTE PARA SÓLIDO =====
const header = document.getElementById('header');

function updateHeader() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.classList.remove('transparent');
    } else {
        header.classList.add('transparent');
        header.classList.remove('scrolled');
    }
}

// Estado inicial
updateHeader();

// Monitorar scroll
window.addEventListener('scroll', updateHeader);

// ===== MENU MOBILE =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const menuIcon = document.getElementById('menuIcon');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Troca o ícone entre 'bars' e 'times'
        if (navMenu.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
}

// Fecha o menu mobile ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1023) {
            navMenu.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
});

// ===== CONTADOR ANIMADO (NÚMEROS) =====
function animateNumbers() {
    const numerosSection = document.getElementById('numeros');
    if (!numerosSection) return;
    
    // Se já foi animado, não animar de novo
    if (numerosSection.dataset.animated === 'true') return;
    
    const elementos = [
        { element: document.getElementById('numeroProjetos'), target: 45 },
        { element: document.getElementById('numeroFamilias'), target: 3200 },
        { element: document.getElementById('numeroAnos'), target: 12 },
        { element: document.getElementById('numeroCertificacoes'), target: 100 }
    ];
    
    const duration = 2000; // 2 segundos
    const interval = 20; // Atualiza a cada 20ms
    const steps = duration / interval;
    
    // Valores iniciais
    let currentValues = elementos.map(() => 0);
    
    // Incrementos por passo
    const increments = elementos.map(item => item.target / steps);
    
    const counter = setInterval(() => {
        let finished = true;
        
        elementos.forEach((item, index) => {
            if (currentValues[index] < item.target) {
                currentValues[index] += increments[index];
                item.element.textContent = Math.min(Math.floor(currentValues[index]), item.target);
                finished = false;
            } else {
                item.element.textContent = item.target;
            }
        });
        
        if (finished) {
            clearInterval(counter);
            numerosSection.dataset.animated = 'true';
        }
    }, interval);
}

// ===== INTERSECTION OBSERVER PARA CONTADOR =====
const numerosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            numerosObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const numerosSection = document.getElementById('numeros');
if (numerosSection) {
    numerosObserver.observe(numerosSection);
}

// ===== INICIALIZAÇÃO DO SWIPER (CARROSSEL) =====
const swiper = new Swiper('.depoimentos-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href !== '') {
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== VALIDAÇÃO DO FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('contactNome');
        const email = document.getElementById('contactEmail');
        const telefone = document.getElementById('contactTelefone');
        
        const errorNome = document.getElementById('errorNome');
        const errorEmail = document.getElementById('errorEmail');
        const errorTelefone = document.getElementById('errorTelefone');
        
        let isValid = true;
        
        // Validação do Nome
        if (nome.value.trim() === '') {
            nome.classList.add('error');
            errorNome.textContent = 'Campo obrigatório';
            isValid = false;
        } else {
            nome.classList.remove('error');
            errorNome.textContent = '';
        }
        
        // Validação do Email
        const emailValue = email.value.trim();
        if (emailValue === '') {
            email.classList.add('error');
            errorEmail.textContent = 'Campo obrigatório';
            isValid = false;
        } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
            email.classList.add('error');
            errorEmail.textContent = 'E-mail inválido';
            isValid = false;
        } else {
            email.classList.remove('error');
            errorEmail.textContent = '';
        }
        
        // Validação do Telefone
        if (telefone.value.trim() === '') {
            telefone.classList.add('error');
            errorTelefone.textContent = 'Campo obrigatório';
            isValid = false;
        } else {
            telefone.classList.remove('error');
            errorTelefone.textContent = '';
        }
        
        if (isValid) {
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            contactForm.reset();
        }
    });
}

// ===== AJUSTE INICIAL PARA ÂNCORAS NA URL =====
window.addEventListener('load', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 200);
        }
    }
});