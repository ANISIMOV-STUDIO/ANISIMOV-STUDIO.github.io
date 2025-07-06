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

// === Snap Scroll ===
class SnapScroll {
  constructor() {
    this.container = document.querySelector('.snap-container');
    this.sections = document.querySelectorAll('.snap-section');
    this.currentSection = 0;
    this.isScrolling = false;
    this.init();
  }
  
  init() {
    if (!this.container || !this.sections.length) return;
    
    this.bindEvents();
  }
  
  isMobile() {
    return window.innerWidth <= 768 || 'ontouchstart' in window;
  }
  
  bindEvents() {
    // Обработка колесика мыши (только на десктопе)
    if (!this.isMobile()) {
      this.container.addEventListener('wheel', (e) => {
        if (this.isScrolling) return;
        
        e.preventDefault();
        
        const delta = e.deltaY;
        const threshold = 50; // Минимальный скролл для переключения
        
        if (Math.abs(delta) > threshold) {
          if (delta > 0) {
            this.scrollToNext();
          } else {
            this.scrollToPrev();
          }
        }
      }, { passive: false });
    }
    
    // Обработка клавиатуры
    document.addEventListener('keydown', (e) => {
      if (this.isScrolling) return;
      
      switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          this.scrollToNext();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          this.scrollToPrev();
          break;
        case 'Home':
          e.preventDefault();
          this.scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          this.scrollToSection(this.sections.length - 1);
          break;
      }
    });
    
    // Обработка тач-жестов (улучшенная для мобильных)
    if (this.isMobile()) {
      let touchStartY = 0;
      let touchEndY = 0;
      let touchStartTime = 0;
      
      this.container.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }, { passive: true });
      
      this.container.addEventListener('touchend', (e) => {
        if (this.isScrolling) return;
        
        touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        const deltaTime = Date.now() - touchStartTime;
        const threshold = 30; // Меньший порог для мобильных
        
        // Проверяем, что это был быстрый свайп, а не медленная прокрутка
        if (Math.abs(deltaY) > threshold && deltaTime < 300) {
          if (deltaY > 0) {
            this.scrollToNext();
          } else {
            this.scrollToPrev();
          }
        }
      }, { passive: true });
    }
  }
  
  scrollToNext() {
    if (this.currentSection < this.sections.length - 1) {
      this.currentSection++;
      this.scrollToSection(this.currentSection);
    }
  }
  
  scrollToPrev() {
    if (this.currentSection > 0) {
      this.currentSection--;
      this.scrollToSection(this.currentSection);
    }
  }
  
  scrollToSection(index) {
    if (index < 0 || index >= this.sections.length || this.isScrolling) return;
    
    this.isScrolling = true;
    this.currentSection = index;
    
    const targetSection = this.sections[index];
    const targetTop = targetSection.offsetTop;
    
    // Плавная прокрутка
    this.container.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
    
    // Разблокировка через время анимации (быстрее на мобильных)
    const animationTime = this.isMobile() ? 600 : 800;
    setTimeout(() => {
      this.isScrolling = false;
    }, animationTime);
  }
}

// === Parallax Effect ===
class ParallaxEffect {
  constructor() {
    this.snapContainer = document.querySelector('.snap-container');
    this.init();
  }
  
  init() {
    if (!this.snapContainer) return;
    
    let ticking = false;
    
    this.snapContainer.addEventListener('scroll', () => {
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
    const scrolled = this.snapContainer.scrollTop;
    const noiseOverlay = document.querySelector('.noise-overlay');
    
    if (noiseOverlay) {
      const rate = scrolled * -0.3;
      noiseOverlay.style.transform = `translateY(${rate}px)`;
    }
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
  new SnapScroll();
  new ParallaxEffect();
  new HighlightEffect();
  
  // Добавить класс loaded для финальных анимаций
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 1000);
});

 