// main.js - Основной файл с логикой сайта

document.addEventListener('DOMContentLoaded', function() {
    console.log('[SYSTEM] SMM Digital Marketing Guide loaded');
    console.log('[VERSION] 2.4.1_cyberpunk');
    console.log('[STATUS] Online');
    
    // Инициализация всех модулей
    initSystem();
    initStatsCounter();
    initBlockAnimations();
    initTypewriterEffect();
    initScrollEffects();
    initTooltips();
    
    // Мониторинг производительности
    monitorPerformance();
});

// ===== СИСТЕМНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initSystem() {
    console.log('[SYSTEM] Initializing cyberpunk modules...');
    
    // Установка текущей даты в подвале
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
    
    // Системное время
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
    
    // Проверка состояния системы
    simulateSystemLoad();
}

// ===== АНИМАЦИЯ СЧЕТЧИКОВ =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-num');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 20);
    });
}

// ===== АНИМАЦИЯ БЛОКОВ =====
function initBlockAnimations() {
    const blocks = document.querySelectorAll('.book-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Добавляем свечение при появлении
                setTimeout(() => {
                    entry.target.classList.add('block-active');
                }, 300);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    blocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'all 0.6s ease';
        observer.observe(block);
    });
}

// ===== ЭФФЕКТ ПИШУЩЕЙ МАШИНКИ =====
function initTypewriterEffect() {
    const subtitles = document.querySelectorAll('.subtitle');
    
    subtitles.forEach(subtitle => {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Запускаем с задержкой
        setTimeout(typeWriter, 1000);
    });
}

// ===== ЭФФЕКТЫ ПРИ СКРОЛЛЕ =====
function initScrollEffects() {
    let lastScroll = 0;
    const header = document.querySelector('.cyber-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Эффект параллакса для фона
        const scrolled = window.pageYOffset;
        const parallaxBg = document.querySelector('.cyber-bg');
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Показ/скрытие header при скролле
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
        
        // Подсветка активной секции в навигации
        highlightActiveSection();
    });
}

// ===== ПОДСВЕТКА АКТИВНОЙ СЕКЦИИ =====
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== ТУЛТИПЫ =====
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        
        tooltip.className = 'cyber-tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseenter', (e) => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - 40}px`;
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translate(-50%, 0)';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translate(-50%, 10px)';
        });
    });
    
    // Стили для тултипов
    const style = document.createElement('style');
    style.textContent = `
        .cyber-tooltip {
            position: fixed;
            background: rgba(10, 10, 15, 0.95);
            color: var(--primary-neon);
            padding: 8px 16px;
            border-radius: 4px;
            font-family: 'Exo 2', sans-serif;
            font-size: 0.9rem;
            border: 1px solid var(--primary-neon);
            box-shadow: var(--glow-primary);
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transform: translate(-50%, 10px);
            transition: all 0.3s ease;
            white-space: nowrap;
        }
        
        .cyber-tooltip::before {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid var(--primary-neon);
        }
    `;
    document.head.appendChild(style);
}

// ===== СИСТЕМНОЕ ВРЕМЯ =====
function updateSystemTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const dateString = now.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    const systemInfo = document.querySelector('.system-info');
    if (systemInfo) {
        const timeElement = document.createElement('span');
        timeElement.textContent = `[TIME: ${timeString}]`;
        timeElement.style.animation = 'systemPulse 2s infinite alternate';
        
        // Обновляем или добавляем элемент времени
        const existingTime = systemInfo.querySelector('.system-time');
        if (existingTime) {
            existingTime.textContent = `[TIME: ${timeString}]`;
        } else {
            timeElement.className = 'system-time';
            systemInfo.appendChild(timeElement);
        }
    }
}

// ===== СИМУЛЯЦИЯ НАГРУЗКИ СИСТЕМЫ =====
function simulateSystemLoad() {
    const loadElement = document.querySelector('.system-info span:nth-child(2)');
    if (!loadElement) return;
    
    let load = 92;
    let direction = -1;
    
    setInterval(() => {
        load += direction * (Math.random() * 5);
        
        if (load < 80) direction = 1;
        if (load > 98) direction = -1;
        
        loadElement.textContent = `[LOAD: ${Math.floor(load)}%]`;
        
        // Меняем цвет в зависимости от нагрузки
        if (load > 95) {
            loadElement.style.color = 'var(--danger-neon)';
            loadElement.style.background = 'rgba(255, 0, 85, 0.2)';
        } else if (load > 85) {
            loadElement.style.color = 'var(--warning-neon)';
            loadElement.style.background = 'rgba(255, 170, 0, 0.2)';
        } else {
            loadElement.style.color = 'var(--primary-neon)';
            loadElement.style.background = 'rgba(0, 255, 157, 0.1)';
        }
    }, 3000);
}

// ===== МОНИТОРИНГ ПРОИЗВОДИТЕЛЬНОСТИ =====
function monitorPerformance() {
    // Отслеживание времени загрузки
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`[PERFORMANCE] Page loaded in ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('[PERFORMANCE WARNING] Load time exceeds 3 seconds');
        }
    });
    
    // Отслеживание FPS
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;
    
    function checkFPS(currentTime) {
        frameCount++;
        
        if (currentTime - lastTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;
            
            if (fps < 30) {
                console.warn(`[PERFORMANCE WARNING] Low FPS: ${fps}`);
            }
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    requestAnimationFrame(checkFPS);
}

// ===== СОХРАНЕНИЕ ПРОГРЕССА =====
function initProgressTracking() {
    const visitedSections = new Set();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId) {
                    visitedSections.add(sectionId);
                    localStorage.setItem('visitedSections', JSON.stringify([...visitedSections]));
                    updateProgressBar();
                }
            }
        });
    }, { threshold: 0.5 });
    
    // Наблюдаем за всеми секциями
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
    
    // Восстанавливаем прогресс
    const savedProgress = localStorage.getItem('visitedSections');
    if (savedProgress) {
        try {
            const sections = JSON.parse(savedProgress);
            sections.forEach(id => visitedSections.add(id));
        } catch (e) {
            console.error('Error loading progress:', e);
        }
    }
    
    updateProgressBar();
}

function updateProgressBar() {
    const allSections = document.querySelectorAll('section[id]').length;
    const visited = new Set(JSON.parse(localStorage.getItem('visitedSections') || '[]')).size;
    const progress = (visited / allSections) * 100;
    
    // Создаем или обновляем прогресс-бар
    let progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 9999;
        `;
        
        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressFill.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, var(--primary-neon), var(--secondary-neon));
            width: 0%;
            transition: width 0.3s ease;
        `;
        
        progressBar.appendChild(progressFill);
        document.body.appendChild(progressBar);
    }
    
    const progressFill = progressBar.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
}

// ===== ЭКСПОРТ ФУНКЦИЙ ДЛЯ ГЛОБАЛЬНОГО ДОСТУПА =====
window.CyberSystem = {
    version: '2.4.1',
    init: initSystem,
    getProgress: () => {
        const visited = new Set(JSON.parse(localStorage.getItem('visitedSections') || '[]')).size;
        const total = document.querySelectorAll('section[id]').length;
        return { visited, total, percentage: (visited / total) * 100 };
    },
    resetProgress: () => {
        localStorage.removeItem('visitedSections');
        location.reload();
    },
    simulateGlitch: () => {
        document.body.classList.add('glitch-effect');
        setTimeout(() => {
            document.body.classList.remove('glitch-effect');
        }, 500);
    }
};

// Инициализация отслеживания прогресса
initProgressTracking();