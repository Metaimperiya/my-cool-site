// Основной скрипт для книги "SMM & Digital Marketing"

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('📖 Книга "SMM & Digital Marketing" загружена');
    
    // Инициализация всех компонентов
    initBookStructure();
    initProgressTracker();
    initBlockNavigation();
    initTooltips();
    initThemeSwitcher();
    initPrintFunctionality();
    initTimelineAnimation();
    initParallaxEffect();
    
    // Показать приветственное сообщение
    showWelcomeMessage();
});

// 1. Управление структурой книги
function initBookStructure() {
    // Сначала соберем ВСЕ пункты списков для правильной нумерации
    const allListItems = document.querySelectorAll('ol li, ul li');
    let globalIndex = 1;
    
    allListItems.forEach((item) => {
        // Добавить id для навигации
        item.id = `paragraph-${globalIndex}`;
        
        // Добавить кнопку для пометки как изученного
        const markButton = document.createElement('span');
        markButton.className = 'mark-paragraph';
        markButton.innerHTML = '📌';
        markButton.title = 'Отметить как изученное';
        markButton.onclick = function() {
            toggleParagraphStatus(item, globalIndex);
        };
        
        item.prepend(markButton);
        globalIndex++;
    });
    
    // Создать оглавление
    createTableOfContents();
}

// 2. Трекер прогресса изучения
function initProgressTracker() {
    const progressContainer = document.createElement('div');
    progressContainer.id = 'progress-tracker';
    progressContainer.className = 'progress-tracker';
    
    progressContainer.innerHTML = `
        <div class="progress-header">
            <h3>📊 Прогресс изучения</h3>
            <button id="reset-progress">Сбросить</button>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" id="progress-fill">0%</div>
        </div>
        <div class="progress-stats">
            <span id="studied-count">0</span> / <span id="total-count">160</span> параграфов изучено
        </div>
        <div class="progress-by-level">
            <div class="level-progress" data-level="1">
                <span>Уровень 1: <span class="level-count">0/40</span></span>
                <div class="mini-progress"></div>
            </div>
            <div class="level-progress" data-level="2">
                <span>Уровень 2: <span class="level-count">0/60</span></span>
                <div class="mini-progress"></div>
            </div>
            <div class="level-progress" data-level="3">
                <span>Уровень 3: <span class="level-count">0/40</span></span>
                <div class="mini-progress"></div>
            </div>
            <div class="level-progress" data-level="4">
                <span>Уровень 4: <span class="level-count">0/20</span></span>
                <div class="mini-progress"></div>
            </div>
        </div>
    `;
    
    document.body.insertBefore(progressContainer, document.body.firstChild);
    
    // Обработчик сброса прогресса
    document.getElementById('reset-progress').addEventListener('click', resetProgress);
    
    // Загрузить сохраненный прогресс
    loadProgress();
}

// 3. Навигация по блокам
function initBlockNavigation() {
    const navContainer = document.createElement('nav');
    navContainer.className = 'block-navigation';
    
    const blocks = [
        { num: 1, title: 'Основы SMM', emoji: '📌' },
        { num: 2, title: 'Реклама и аналитика', emoji: '📊' },
        { num: 3, title: 'Риски и безопасность', emoji: '⚠️' },
        { num: 4, title: 'Teamwork и команда', emoji: '👥' },
        { num: 5, title: 'Конкуренция и ниши', emoji: '🎯' },
        { num: 6, title: 'Мошенничество и защита', emoji: '🛡️' },
        { num: 7, title: 'SEO и ретаргетинг', emoji: '🔍' },
        { num: 8, title: 'Инструменты и автоматизация', emoji: '🛠️' },
        { num: 9, title: 'Профессии и услуги', emoji: '💼' },
        { num: 10, title: 'Масштабирование и финансы', emoji: '💰' },
        { num: 11, title: 'Технический стек', emoji: '⚙️' },
        { num: 12, title: 'Психология и soft skills', emoji: '🧠' }
    ];
    
    navContainer.innerHTML = `
        <div class="nav-header">
            <span>🔍 Быстрая навигация по блокам:</span>
            <button id="toggle-nav">▲ Свернуть</button>
        </div>
        <div class="blocks-grid" id="blocks-grid">
            ${blocks.map(block => `
                <div class="block-nav-item" data-block="${block.num}">
                    <span class="block-emoji">${block.emoji}</span>
                    <span class="block-title">Блок ${block.num}: ${block.title}</span>
                    <span class="block-progress" data-block="${block.num}">0%</span>
                </div>
            `).join('')}
        </div>
    `;
    
    document.body.insertBefore(navContainer, document.body.firstChild.nextSibling);
    
    // Обработчики навигации
    document.querySelectorAll('.block-nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const blockNum = this.getAttribute('data-block');
            scrollToBlock(blockNum);
        });
    });
    
    // Переключение видимости навигации
    document.getElementById('toggle-nav').addEventListener('click', function() {
        const grid = document.getElementById('blocks-grid');
        const isHidden = grid.style.display === 'none';
        
        grid.style.display = isHidden ? 'grid' : 'none';
        this.textContent = isHidden ? '▲ Свернуть' : '▼ Развернуть';
    });
}

// 4. Всплывающие подсказки
function initTooltips() {
    // Создать контейнер для подсказок
    const tooltipContainer = document.createElement('div');
    tooltipContainer.id = 'tooltip-container';
    document.body.appendChild(tooltipContainer);
    
    // Добавить подсказки к ключевым терминам
    const keyTerms = document.querySelectorAll('.key-term');
    keyTerms.forEach(term => {
        const termText = term.textContent;
        const definition = getTermDefinition(termText);
        
        if (definition) {
            term.setAttribute('data-tooltip', definition);
            term.classList.add('has-tooltip');
            
            term.addEventListener('mouseenter', showTooltip);
            term.addEventListener('mouseleave', hideTooltip);
        }
    });
}

// 5. Переключение темы
function initThemeSwitcher() {
    const themeButton = document.createElement('button');
    themeButton.id = 'theme-switcher';
    themeButton.className = 'theme-switcher';
    themeButton.innerHTML = '🌙 Ночной режим';
    themeButton.title = 'Переключить тему';
    
    document.body.appendChild(themeButton);
    
    // Проверить сохраненную тему
    const savedTheme = localStorage.getItem('book-theme');
    if (savedTheme === 'dark') {
        enableDarkTheme();
        themeButton.innerHTML = '☀️ Дневной режим';
    }
    
    themeButton.addEventListener('click', function() {
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            disableDarkTheme();
            this.innerHTML = '🌙 Ночной режим';
        } else {
            enableDarkTheme();
            this.innerHTML = '☀️ Дневной режим';
        }
    });
}

// 6. Функциональность печати
function initPrintFunctionality() {
    const printButton = document.createElement('button');
    printButton.id = 'print-button';
    printButton.className = 'print-button';
    printButton.innerHTML = '🖨️ Печать структуры';
    printButton.title = 'Распечатать структуру книги';
    
    document.body.appendChild(printButton);
    
    printButton.addEventListener('click', function() {
        // Создать версию для печати
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Структура книги: SMM & Digital Marketing</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.5; margin: 20px; }
                    h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
                    h2 { color: #444; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 30px; }
                    h3 { color: #555; }
                    .print-date { color: #666; margin-bottom: 30px; font-style: italic; }
                    .book-container { max-width: 100%; }
                </style>
            </head>
            <body>
                <h1>Структура книги: SMM & Digital Marketing</h1>
                <div class="print-date">Сгенерировано: ${new Date().toLocaleDateString()}</div>
                ${document.querySelector('.book-container')?.innerHTML || document.body.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    });
}

// 7. Анимация таймлайна
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Добавить анимацию появления при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
}

// 8. Эффект параллакса
function initParallaxEffect() {
    const bookContainer = document.querySelector('.book-container');
    
    if (bookContainer) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1;
            bookContainer.style.transform = `translateY(${rate}px)`;
        });
    }
}

// 9. Приветственное сообщение
function showWelcomeMessage() {
    if (!localStorage.getItem('book-welcome-shown')) {
        setTimeout(() => {
            alert('📚 Добро пожаловать в структуру книги "SMM & Digital Marketing"!\n\n' +
                  'Используйте навигацию для быстрого перехода между блоками.\n' +
                  'Отмечайте изученные параграфы для отслеживания прогресса.');
            
            localStorage.setItem('book-welcome-shown', 'true');
        }, 1000);
    }
}

// Вспомогательные функции

function toggleParagraphStatus(item, paragraphNumber) {
    item.classList.toggle('studied');
    const studiedParagraphs = JSON.parse(localStorage.getItem('studied-paragraphs') || '[]');
    
    if (item.classList.contains('studied')) {
        if (!studiedParagraphs.includes(paragraphNumber)) {
            studiedParagraphs.push(paragraphNumber);
            showNotification(`Параграф ${paragraphNumber} отмечен как изученный!`);
        }
    } else {
        const index = studiedParagraphs.indexOf(paragraphNumber);
        if (index > -1) studiedParagraphs.splice(index, 1);
    }
    
    localStorage.setItem('studied-paragraphs', JSON.stringify(studiedParagraphs));
    updateProgress();
}

function updateProgress() {
    const studiedParagraphs = JSON.parse(localStorage.getItem('studied-paragraphs') || '[]');
    const totalParagraphs = document.querySelectorAll('ol li, ul li').length;
    const studiedCount = studiedParagraphs.length;
    const progressPercentage = Math.round((studiedCount / totalParagraphs) * 100);
    
    // Обновить основной прогресс
    const progressFill = document.getElementById('progress-fill');
    const studiedCountEl = document.getElementById('studied-count');
    const totalCountEl = document.getElementById('total-count');
    
    if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
        progressFill.textContent = `${progressPercentage}%`;
    }
    
    if (studiedCountEl) studiedCountEl.textContent = studiedCount;
    if (totalCountEl) totalCountEl.textContent = totalParagraphs;
    
    // Обновить прогресс по уровням
    updateLevelProgress(studiedParagraphs);
    
    // Обновить прогресс по блокам
    updateBlockProgress(studiedParagraphs);
}

function updateLevelProgress(studiedParagraphs) {
    const levels = [
        { range: [1, 40], element: document.querySelector('[data-level="1"]') },
        { range: [41, 100], element: document.querySelector('[data-level="2"]') },
        { range: [101, 140], element: document.querySelector('[data-level="3"]') },
        { range: [141, 160], element: document.querySelector('[data-level="4"]') }
    ];
    
    levels.forEach(level => {
        if (level.element) {
            const count = studiedParagraphs.filter(p => 
                p >= level.range[0] && p <= level.range[1]
            ).length;
            const total = level.range[1] - level.range[0] + 1;
            const percentage = Math.round((count / total) * 100);
            
            const countSpan = level.element.querySelector('.level-count');
            const progressBar = level.element.querySelector('.mini-progress');
            
            if (countSpan) countSpan.textContent = `${count}/${total}`;
            if (progressBar) progressBar.style.width = `${percentage}%`;
        }
    });
}

function updateBlockProgress(studiedParagraphs) {
    // Обновить все блоки
    for (let i = 1; i <= 12; i++) {
        const blockProgress = document.querySelector(`.block-progress[data-block="${i}"]`);
        if (blockProgress) {
            // Простая логика: если отмечено 3 параграфа из блока - 30%
            const percentage = Math.min(100, studiedParagraphs.length * 10);
            blockProgress.textContent = `${percentage}%`;
            blockProgress.style.color = percentage === 100 ? '#48bb78' : 
                                       percentage >= 50 ? '#4299e1' : 
                                       '#e53e3e';
        }
    }
}

function loadProgress() {
    // Восстановить отметки изученных параграфов
    const studiedParagraphs = JSON.parse(localStorage.getItem('studied-paragraphs') || '[]');
    studiedParagraphs.forEach(paragraphNum => {
        const item = document.getElementById(`paragraph-${paragraphNum}`);
        if (item) {
            item.classList.add('studied');
        }
    });
    
    updateProgress();
}

function resetProgress() {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
        localStorage.removeItem('studied-paragraphs');
        document.querySelectorAll('.studied').forEach(el => el.classList.remove('studied'));
        updateProgress();
        showNotification('Прогресс сброшен!');
    }
}

function scrollToBlock(blockNum) {
    const blockHeader = Array.from(document.querySelectorAll('h3')).find(h3 => 
        h3.textContent.includes(`БЛОК ${blockNum}:`) || h3.textContent.includes(`БЛОК ${blockNum}`)
    );
    
    if (blockHeader) {
        blockHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Подсветить блок
        blockHeader.style.animation = 'highlight 1s ease';
        setTimeout(() => blockHeader.style.animation = '', 1000);
    }
}

function showTooltip(event) {
    const tooltip = document.getElementById('tooltip-container');
    const text = event.target.getAttribute('data-tooltip');
    
    if (tooltip && text) {
        tooltip.textContent = text;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    }
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip-container');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

function getTermDefinition(term) {
    const definitions = {
        'SMM': 'Social Media Marketing - маркетинг в социальных сетях',
        'KPI': 'Key Performance Indicator - ключевые показатели эффективности',
        'CTR': 'Click-Through Rate - показатель кликабельности',
        'CPM': 'Cost Per Mille - стоимость тысячи показов',
        'CPA': 'Cost Per Action - стоимость целевого действия',
        'SEO': 'Search Engine Optimization - поисковая оптимизация',
        'UGC': 'User Generated Content - пользовательский контент',
        'CRM': 'Customer Relationship Management - система управления взаимоотношениями с клиентами',
        'SaaS': 'Software as a Service - программное обеспечение как услуга',
        'API': 'Application Programming Interface - программный интерфейс приложения'
    };
    
    return definitions[term] || null;
}

function enableDarkTheme() {
    document.body.classList.add('dark-theme');
    localStorage.setItem('book-theme', 'dark');
}

function disableDarkTheme() {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('book-theme', 'light');
}

function createTableOfContents() {
    const tocContainer = document.createElement('div');
    tocContainer.id = 'table-of-contents';
    tocContainer.className = 'table-of-contents';
    
    const headers = Array.from(document.querySelectorAll('h2, h3')).filter(h => 
        h.textContent.includes('БЛОК') || h.textContent.includes('Уровень') || 
        h.textContent.includes('ДОПОЛНИТЕЛЬНЫЕ') || h.textContent.includes('УНИКАЛЬНЫЕ') ||
        h.textContent.includes('ПЛАН РАЗРАБОТКИ')
    );
    
    let tocHTML = '<h3>📑 Оглавление</h3><ul>';
    
    headers.forEach(header => {
        const level = header.tagName === 'H2' ? 'toc-h2' : 'toc-h3';
        const text = header.textContent.replace(/[📖📚📌📊⚠️👥🎯🛡️🔍🛠️💼💰⚙️🧠📈🎨🚀📋]/g, '').trim();
        const id = header.id || `section-${Math.random().toString(36).substr(2, 9)}`;
        
        header.id = id;
        
        tocHTML += `
            <li class="${level}">
                <a href="#${id}">
                    ${text}
                </a>
            </li>
        `;
    });
    
    tocHTML += '</ul>';
    tocContainer.innerHTML = tocHTML;
    
    // Вставить оглавление после первого h2
    const firstH2 = document.querySelector('h2');
    if (firstH2 && firstH2.parentNode) {
        firstH2.parentNode.insertBefore(tocContainer, firstH2.nextSibling);
    }
    
    // Добавить прокрутку к заголовкам
    tocContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Стили
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .progress-tracker {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        width: 300px;
        max-height: 80vh;
        overflow-y: auto;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }
    
    .progress-header h3 {
        margin: 0;
        font-size: 1.2em;
        color: #2d3748;
    }
    
    #reset-progress {
        background: #fc8181;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.9em;
    }
    
    .progress-bar {
        height: 25px;
        background: #e2e8f0;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #48bb78, #38a169);
        text-align: center;
        color: white;
        font-weight: bold;
        line-height: 25px;
        transition: width 0.5s ease;
        width: 0%;
    }
    
    .progress-stats {
        text-align: center;
        font-weight: bold;
        margin-bottom: 15px;
    }
    
    .level-progress {
        margin-bottom: 10px;
    }
    
    .level-progress span {
        display: block;
        margin-bottom: 5px;
        font-size: 0.9em;
    }
    
    .mini-progress {
        height: 8px;
        background: #cbd5e0;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .mini-progress::after {
        content: '';
        display: block;
        height: 100%;
        background: #4299e1;
        width: 0%;
        transition: width 0.5s ease;
    }
    
    .block-navigation {
        position: fixed;
        top: 20px;
        left: 20px;
        background: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        width: 300px;
    }
    
    .nav-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }
    
    #toggle-nav {
        background: #667eea;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.8em;
    }
    
    .blocks-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
        max-height: 400px;
        overflow-y: auto;
    }
    
    .block-nav-item {
        padding: 10px;
        border-radius: 8px;
        background: #f8fafc;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        border: 1px solid #e2e8f0;
    }
    
    .block-nav-item:hover {
        background: #edf2f7;
        transform: translateX(5px);
        border-color: #667eea;
    }
    
    .block-emoji {
        margin-right: 10px;
        font-size: 1.2em;
    }
    
    .block-title {
        flex-grow: 1;
        font-size: 0.9em;
    }
    
    .block-progress {
        font-size: 0.8em;
        font-weight: bold;
        background: #e2e8f0;
        padding: 2px 8px;
        border-radius: 10px;
        min-width: 40px;
        text-align: center;
    }
    
    .mark-paragraph {
        cursor: pointer;
        margin-right: 10px;
        font-size: 1.2em;
        transition: transform 0.3s ease;
        display: inline-block;
    }
    
    .mark-paragraph:hover {
        transform: scale(1.3);
    }
    
    .studied {
        background: linear-gradient(90deg, rgba(72, 187, 120, 0.1), transparent);
        border-left: 3px solid #48bb78;
        padding-left: 20px;
    }
    
    .studied .mark-paragraph {
        color: #48bb78;
    }
    
    #tooltip-container {
        position: absolute;
        background: #2d3748;
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 0.9em;
        max-width: 300px;
        z-index: 10000;
        display: none;
        pointer-events: none;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .has-tooltip {
        border-bottom: 1px dashed #667eea;
        cursor: help;
    }
    
    .theme-switcher {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    }
    
    .theme-switcher:hover {
        background: #764ba2;
        transform: translateY(-2px);
    }
    
    .dark-theme {
        background: #1a202c;
        color: #e2e8f0;
    }
    
    .dark-theme .book-container {
        background: #2d3748;
        color: #e2e8f0;
    }
    
    .dark-theme .book-block {
        background: #4a5568;
        border-color: #718096;
    }
    
    .print-button {
        position: fixed;
        bottom: 70px;
        right: 20px;
        background: #38a169;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    
    .table-of-contents {
        background: #f8fafc;
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
        border-left: 5px solid #667eea;
    }
    
    .table-of-contents h3 {
        margin-top: 0;
        color: #2d3748;
    }
    
    .table-of-contents ul {
        list-style: none;
        padding-left: 0;
    }
    
    .toc-h2 {
        font-weight: bold;
        margin: 10px 0 5px;
    }
    
    .toc-h3 {
        font-size: 0.9em;
        margin-left: 20px;
        margin: 5px 0 5px 20px;
    }
    
    .table-of-contents a {
        color: #4a5568;
        text-decoration: none;
        transition: color 0.3s ease;
    }
    
    .table-of-contents a:hover {
        color: #667eea;
        text-decoration: underline;
    }
    
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #48bb78;
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
    
    @keyframes highlight {
        0% { background-color: transparent; }
        50% { background-color: rgba(102, 126, 234, 0.3); }
        100% { background-color: transparent; }
    }
    
    @media (max-width: 1200px) {
        .progress-tracker,
        .block-navigation {
            position: static;
            width: auto;
            margin: 20px;
            max-height: none;
        }
        
        .blocks-grid {
            max-height: none;
        }
        
        .theme-switcher,
        .print-button {
            position: static;
            margin: 10px;
            display: inline-block;
        }
    }
`;

document.head.appendChild(styleSheet);

// Экспорт функций для использования в консоли
window.BookManager = {
    updateProgress,
    resetProgress,
    scrollToBlock,
    enableDarkTheme,
    disableDarkTheme,
    exportProgress: function() {
        const progress = JSON.parse(localStorage.getItem('studied-paragraphs') || '[]');
        return JSON.stringify(progress, null, 2);
    },
    importProgress: function(jsonString) {
        try {
            const progress = JSON.parse(jsonString);
            localStorage.setItem('studied-paragraphs', JSON.stringify(progress));
            updateProgress();
            showNotification('Прогресс импортирован!');
        } catch (e) {
            alert('Ошибка при импорте прогресса');
        }
    }
};

// Загрузить прогресс после загрузки
setTimeout(loadProgress, 500);