// === Premium Protection & UX ===
document.addEventListener('DOMContentLoaded', function() {
  // Блокировка контекстного меню
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Блокировка горячих клавиш
  document.addEventListener('keydown', function(e) {
    // Блокировка Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+S, Ctrl+P
    if (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 's' || e.key === 'p')) {
      e.preventDefault();
      return false;
    }
    
    // Блокировка F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u')) {
      e.preventDefault();
      return false;
    }
  });
  
  // Блокировка выделения мышью
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Блокировка drag & drop
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Премиальный курсор-следящий эффект
  const cursor = document.createElement('div');
  cursor.className = 'premium-cursor';
  cursor.innerHTML = '✦';
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
});

// === Language Switcher ===
class LanguageSwitcher {
  constructor() {
    this.currentLang = 'en';
    this.init();
  }
  
  init() {
    // Получить язык из localStorage или установить по умолчанию
    this.currentLang = localStorage.getItem('language') || 'en';
    this.updateLanguage();
    this.bindEvents();
  }
  
  bindEvents() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        this.switchLanguage(lang);
      });
    });
  }
  
  switchLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.updateLanguage();
    this.updateActiveButton();
  }
  
  updateLanguage() {
    const elements = document.querySelectorAll('[data-' + this.currentLang + ']');
    elements.forEach(element => {
      const text = element.getAttribute('data-' + this.currentLang);
      if (text) {
        element.textContent = text;
      }
    });
    
    // Обновить title страницы
    const titles = {
      'en': 'Anisimov Studio – Development & Innovation',
      'ru': 'Anisimov Studio – Разработка и инновации',
      'zh': 'Anisimov Studio – 开发与创新'
    };
    document.title = titles[this.currentLang];
  }
  
  updateActiveButton() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.lang === this.currentLang) {
        btn.classList.add('active');
      }
    });
  }
}

// === Apple-style Scroll Animations ===
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.animate-on-scroll');
    this.observer = null;
    this.init();
  }
  
  init() {
    this.createObserver();
    this.observeElements();
    
    // Анимация героя сразу при загрузке
    setTimeout(() => {
      const hero = document.querySelector('.hero-card');
      if (hero) {
        hero.classList.add('animate');
      }
    }, 300);
  }
  
  createObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, options);
  }
  
  observeElements() {
    this.elements.forEach(element => {
      this.observer.observe(element);
    });
  }
}

// === Smooth Scrolling ===
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    // Плавная прокрутка для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// === Parallax Effect ===
class ParallaxEffect {
  constructor() {
    this.init();
  }
  
  init() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.glass');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
}

// === Highlight Layer Effect ===
class HighlightEffect {
  constructor() {
    this.hero = document.getElementById('hero');
    this.highlight = document.getElementById('highlight');
    this.init();
  }
  
  init() {
    if (this.hero && this.highlight) {
      this.hero.addEventListener('mousemove', (e) => {
        const rect = this.hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        this.highlight.style.setProperty('--mouse-x', x + '%');
        this.highlight.style.setProperty('--mouse-y', y + '%');
        this.highlight.style.opacity = '1';
      });
      
      this.hero.addEventListener('mouseleave', () => {
        this.highlight.style.opacity = '0';
      });
    }
  }
}

// === Initialization ===
document.addEventListener('DOMContentLoaded', () => {
  new LanguageSwitcher();
  new ScrollAnimations();
  new SmoothScroll();
  new ParallaxEffect();
  new HighlightEffect();
  
  // Добавить класс loaded для финальных анимаций
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 1000);
});

// === DOM Elements ===
const hero = document.getElementById('hero');
const highlight = document.getElementById('highlight');

// === Parallax Hero Tilt ===
let isMouseInWindow = true;

document.addEventListener('mousemove', (e) => {
  if (!isMouseInWindow) return;
  
  const { innerWidth: w, innerHeight: h } = window;
  
  // Hero tilt effect
  const rotY = ((e.clientX - w/2) / w) * 12; // ±12deg range
  const rotX = -((e.clientY - h/2) / h) * 8;  // ±8deg range
  
  hero.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  
  // Dynamic highlight following cursor
  const x = (e.clientX / w) * 100 + '%';
  const y = (e.clientY / h) * 100 + '%';
  
  highlight.style.setProperty('--mx', x);
  highlight.style.setProperty('--my', y);
});

// === Mouse enter/leave window tracking ===
window.addEventListener('mouseenter', () => {
  isMouseInWindow = true;
});

window.addEventListener('mouseleave', () => {
  isMouseInWindow = false;
  // Reset hero tilt
  hero.style.transform = '';
  // Reset highlight to center
  highlight.style.setProperty('--mx', '50%');
  highlight.style.setProperty('--my', '50%');
});

// === Scroll-based hero fade ===
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const fadeStart = 100;
  const fadeEnd = 400;
  
  if (scrolled <= fadeStart) {
    hero.style.opacity = '1';
  } else if (scrolled >= fadeEnd) {
    hero.style.opacity = '0.2';
  } else {
    const fadeProgress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
    hero.style.opacity = 1 - (fadeProgress * 0.8);
  }
});

// === Card stagger animation on load ===
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const infoCards = document.querySelectorAll('.info-card');
  
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 800 + (index * 150)); // Stagger by 150ms
  });
  
  // Animate info cards
  infoCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
    }, 300 + (index * 200)); // Stagger info cards
  });
});

// === Enhanced card hover effects ===
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', (e) => {
    // Add golden glow overlay
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--hover-x', `${x}px`);
    card.style.setProperty('--hover-y', `${y}px`);
  });
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--hover-x', `${x}px`);
    card.style.setProperty('--hover-y', `${y}px`);
  });
});

// === Performance optimization: throttle scroll events ===
let scrollTimeout;
const originalScrollHandler = window.onscroll;

window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  scrollTimeout = setTimeout(() => {
    // Scroll handler logic here
  }, 16); // ~60fps
}); 