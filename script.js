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
    // Добавить номера параграфов к спискам
    const allLists = document.querySelectorAll('ol, ul');
    
    allLists.forEach((list, listIndex) => {
        const items = list.querySelectorAll('li');
        
        items.forEach((item, itemIndex) => {
            // Добавить id для навигации
            const paragraphNumber = calculateParagraphNumber(list, listIndex, itemIndex);
            item.id = `paragraph-${paragraphNumber}`;
            
            // Добавить кнопку для пометки как изученного
            const markButton = document.createElement('span');
            markButton.className = 'mark-paragraph';
            markButton.innerHTML = '📌';
            markButton.title = 'Отметить как изученное';
            markButton.onclick = function() {
                toggleParagraphStatus(item, paragraphNumber);
            };
            
            item.prepend(markButton);
            
            // Добавить счетчик для ol
            if (list.tagName === 'OL') {
                const counter = document.createElement('span');
                counter.className = 'paragraph-counter';
                counter.textContent = `${itemIndex + 1}.`;
                item.prepend(counter);
            }
        });
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
                    body { font-family: Arial, sans-serif; line-height: 1.5; }
                    h1 { color: #333; }
                    h2 { border-bottom: 2px solid #ccc; padding-bottom: 5px; }
                    .print-date { color: #666; margin-bottom: 30px; }
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
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;
        
        if (bookContainer) {
            bookContainer.style.transform = `translateY(${rate}px)`;
        }
    });
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

function calculateParagraphNumber(list, listIndex, itemIndex) {
    // Простая логика для расчета номера параграфа
    const baseNumbers = [0, 35, 55, 65, 72, 85, 100, 120, 140, 150, 160, 170];
    const listParent = list.closest('h3, h4')?.previousElementSibling;
    
    if (listParent && listParent.textContent.includes('БЛОК')) {
        const blockMatch = listParent.textContent.match(/БЛОК (\d+)/);
        if (blockMatch) {
            const blockNum = parseInt(blockMatch[1]);
            const base = baseNumbers[blockNum - 1] || 0;
            return base + itemIndex + 1;
        }
    }
    
    return listIndex * 10 + itemIndex + 1;
}

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
    const totalParagraphs = 160; // Общее количество параграфов
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
    const blockRanges = {
        1: [1, 35],
        2: [36, 55],
        3: [56, 65],
        4: [66, 72],
        5: [73, 85],
        6: [86, 100],
        7: [101, 120],
        8: [121, 140],
        9: [141, 150],
        10: [151, 160],
        11: [161, 170],
        12: [171, 179]
    };
    
    Object.entries(blockRanges).forEach(([blockNum, range]) => {
        const blockProgress = document.querySelector(`.block-progress[data-block="${blockNum}"]`);
        if (blockProgress) {
            const count = studiedParagraphs.filter(p => 
                p >= range[0] && p <= range[1]
            ).length;
            const total = range[1] - range[0] + 1;
            const percentage = Math.round((count / total) * 100);
            blockProgress.textContent = `${percentage}%`;
            blockProgress.style.color = percentage === 100 ? '#48bb78' : 
                                       percentage >= 50 ? '#4299e1' : 
                                       '#e53e3e';
        }
    });
}

function loadProgress() {
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
    
    tooltip.textContent = text;
    tooltip.style.display = 'block';
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip-container');
    tooltip.style.display = 'none';
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
        
        tocHTML += `
            <li class="${level}">
                <a href="#${header.id || header.textContent.toLowerCase().replace(/\s+/g, '-')}">
                    ${text}
                </a>
            </li>
        `;
    });
    
    tocHTML += '</ul>';
    tocContainer.innerHTML = tocHTML;
    
    // Вставить оглавление после первого h2
    const firstH2 = document.querySelector('h2');
    if (firstH2) {
        firstH2.parentNode.insertBefore(tocContainer, firstH2.nextSibling);
    }
    
    // Добавить прокрутку к заголовкам
    tocContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId) || 
                          Array.from(document.querySelectorAll('h2, h3')).find(h => 
                              h.textContent.toLowerCase().includes(targetId.replace(/-/g, ' '))
                          );
            
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

// Функция для добавления CSS стилей
function addAdditionalStyles() {
    const additionalStyles = `
        /* Стили для JS-компонентов */
        
        /* Прогресс трекер */
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
            transition: background-color 0.3s ease;
        }
        
        #reset-progress:hover {
            background: #f56565;
        }
        
        .progress-bar {
            height: 25px;
            background: #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 10px;
            position: relative;
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
            min-width: 40px;
            padding: 0 10px;
            box-sizing: border-box;
        }
        
        .progress-stats {
            text-align: center;
            font-weight: bold;
            margin-bottom: 15px;
            color: #4a5568;
        }
        
        .progress-by-level {
            margin-top: 15px;
        }
        
        .level-progress {
            margin-bottom: 12px;
        }
        
        .level-progress:last-child {
            margin-bottom: 0;
        }
        
        .level-progress span {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 0.9em;
            color: #4a5568;
        }
        
        .level-count {
            font-weight: bold;
            color: #2d3748;
        }
        
        .mini-progress {
            height: 8px;
            background: #cbd5e0;
            border-radius: 4px;
            overflow: hidden;
            position: relative;
        }
        
        .mini-progress::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: linear-gradient(90deg, #4299e1, #3182ce);
            width: 0%;
            transition: width 0.5s ease;
            border-radius: 4px;
        }
        
        /* Навигация по блокам */
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .nav-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            color: #4a5568;
        }
        
        #toggle-nav {
            background: #667eea;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.8em;
            transition: background-color 0.3s ease;
        }
        
        #toggle-nav:hover {
            background: #5a67d8;
        }
        
        .blocks-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
            max-height: 400px;
            overflow-y: auto;
            padding-right: 5px;
        }
        
        /* Стили для скроллбара */
        .blocks-grid::-webkit-scrollbar {
            width: 6px;
        }
        
        .blocks-grid::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }
        
        .blocks-grid::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 3px;
        }
        
        .blocks-grid::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
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
            text-align: left;
        }
        
        .block-nav-item:hover {
            background: #edf2f7;
            transform: translateX(5px);
            border-color: #667eea;
        }
        
        .block-emoji {
            margin-right: 10px;
            font-size: 1.2em;
            flex-shrink: 0;
        }
        
        .block-title {
            flex-grow: 1;
            font-size: 0.9em;
            color: #4a5568;
        }
        
        .block-progress {
            font-size: 0.8em;
            font-weight: bold;
            background: #e2e8f0;
            padding: 2px 8px;
            border-radius: 10px;
            min-width: 40px;
            text-align: center;
            flex-shrink: 0;
            transition: all 0.3s ease;
        }
        
        /* Стили для маркировки параграфов */
        .mark-paragraph {
            cursor: pointer;
            margin-right: 10px;
            font-size: 1.2em;
            transition: transform 0.3s ease;
            display: inline-block;
            vertical-align: middle;
            user-select: none;
        }
        
        .mark-paragraph:hover {
            transform: scale(1.3);
        }
        
        .studied {
            background: linear-gradient(90deg, rgba(72, 187, 120, 0.1), transparent);
            border-left: 3px solid #48bb78;
            padding-left: 20px !important;
            position: relative;
        }
        
        .studied::before {
            content: '✓';
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            color: #48bb78;
            font-weight: bold;
        }
        
        .studied .mark-paragraph {
            color: #48bb78;
        }
        
        .paragraph-counter {
            font-weight: bold;
            color: #667eea;
            margin-right: 10px;
            display: inline-block;
            min-width: 20px;
        }
        
        /* Всплывающие подсказки */
        #tooltip-container {
            position: fixed;
            background: #2d3748;
            color: white;
            padding: 10px 15px;
            border-radius: 6px;
            font-size: 0.85em;
            max-width: 300px;
            z-index: 10000;
            display: none;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            line-height: 1.4;
            border: 1px solid #4a5568;
        }
        
        @keyframes tooltipFadeIn {
            from {
                opacity: 0;
                transform: translateY(5px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .has-tooltip {
            border-bottom: 1px dashed #667eea;
            cursor: help;
            position: relative;
        }
        
        /* Переключатель темы */
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 500;
        }
        
        .theme-switcher:hover {
            background: #764ba2;
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.25);
        }
        
        /* Темная тема */
        .dark-theme {
            background: #1a202c;
            color: #e2e8f0;
        }
        
        .dark-theme .book-container {
            background: #2d3748;
            color: #e2e8f0;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.4);
        }
        
        .dark-theme .book-block {
            background: #4a5568;
            border-color: #718096;
            color: #e2e8f0;
        }
        
        .dark-theme .progress-tracker,
        .dark-theme .block-navigation {
            background: #2d3748;
            color: #e2e8f0;
            border: 1px solid #4a5568;
        }
        
        .dark-theme .progress-header h3 {
            color: #e2e8f0;
        }
        
        .dark-theme .block-title {
            color: #e2e8f0;
        }
        
        .dark-theme .block-nav-item {
            background: #4a5568;
            border-color: #718096;
            color: #e2e8f0;
        }
        
        .dark-theme .block-nav-item:hover {
            background: #5a67d8;
            border-color: #667eea;
        }
        
        .dark-theme .progress-bar {
            background: #4a5568;
        }
        
        .dark-theme .mini-progress {
            background: #4a5568;
        }
        
        /* Кнопка печати */
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
            transition: all 0.3s ease;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 500;
        }
        
        .print-button:hover {
            background: #2f855a;
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.25);
        }
        
        /* Оглавление */
        .table-of-contents {
            background: #f8fafc;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 5px solid #667eea;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .table-of-contents h3 {
            margin-top: 0;
            color: #2d3748;
            margin-bottom: 15px;
            font-size: 1.3em;
        }
        
        .table-of-contents ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
        }
        
        .toc-h2 {
            font-weight: bold;
            margin: 10px 0 5px;
            font-size: 1em;
        }
        
        .toc-h3 {
            font-size: 0.9em;
            margin-left: 20px;
            margin: 5px 0 5px 20px;
            opacity: 0.9;
        }
        
        .table-of-contents a {
            color: #4a5568;
            text-decoration: none;
            transition: color 0.3s ease;
            display: block;
            padding: 3px 0;
        }
        
        .table-of-contents a:hover {
            color: #667eea;
            text-decoration: underline;
        }
        
        .dark-theme .table-of-contents {
            background: #4a5568;
            border-left-color: #667eea;
        }
        
        .dark-theme .table-of-contents h3 {
            color: #e2e8f0;
        }
        
        .dark-theme .table-of-contents a {
            color: #e2e8f0 

                    .dark-theme .table-of-contents a:hover {
            color: #90cdf4;
        }
        
        /* Уведомления */
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 500;
            text-align: center;
            max-width: 80%;
            word-wrap: break-word;
        }
        
        .notification.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        
        /* Анимации */
        @keyframes highlight {
            0% { 
                background-color: transparent;
                box-shadow: 0 0 0 rgba(102, 126, 234, 0);
            }
            50% { 
                background-color: rgba(102, 126, 234, 0.2);
                box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
            }
            100% { 
                background-color: transparent;
                box-shadow: 0 0 0 rgba(102, 126, 234, 0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .timeline-item.animated {
            animation: fadeInUp 0.6s ease-out;
        }
        
        /* Адаптивность */
        @media (max-width: 1200px) {
            .progress-tracker,
            .block-navigation {
                position: static;
                width: calc(100% - 40px);
                margin: 20px auto;
                max-height: none;
                box-sizing: border-box;
            }
            
            .blocks-grid {
                max-height: none;
            }
            
            .theme-switcher,
            .print-button {
                position: static;
                display: block;
                margin: 10px auto;
                width: 200px;
            }
            
            #tooltip-container {
                max-width: 90%;
                font-size: 0.8em;
            }
        }
        
        @media (max-width: 768px) {
            .progress-tracker,
            .block-navigation {
                width: calc(100% - 20px);
                margin: 10px;
                padding: 15px;
            }
            
            .progress-tracker {
                width: calc(100% - 20px);
            }
            
            .block-navigation {
                width: calc(100% - 20px);
            }
            
            .block-title {
                font-size: 0.8em;
            }
            
            .notification {
                width: 90%;
                padding: 10px 15px;
                font-size: 0.9em;
            }
        }
        
        @media (max-width: 480px) {
            .progress-tracker,
            .block-navigation {
                padding: 10px;
            }
            
            .block-emoji {
                font-size: 1em;
                margin-right: 8px;
            }
            
            .block-title {
                font-size: 0.75em;
            }
            
            .block-progress {
                font-size: 0.7em;
                min-width: 35px;
            }
            
            .theme-switcher,
            .print-button {
                width: 180px;
                padding: 8px 15px;
                font-size: 0.9em;
            }
        }
    `;
    
    // Добавить стили в документ
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}

// Вызов функции добавления стилей
addAdditionalStyles();

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

// Проверка, что все DOM элементы существуют перед использованием
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (e) {
        console.warn(`Элемент ${selector} не найден:`, e);
        return null;
    }
}

// Инициализация после добавления стилей
setTimeout(() => {
    // Проверяем и добавляем классы, если элементы существуют
    const bookContainer = safeQuerySelector('.book-container');
    if (bookContainer) {
        bookContainer.classList.add('book-loaded');
    }
    
    // Добавляем событие для загрузки прогресса после полной загрузки
    setTimeout(loadProgress, 500);
}, 100);