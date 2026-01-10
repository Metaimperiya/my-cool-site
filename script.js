// Добавление дополнительных стилей через JS
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
        animation: tooltipFadeIn 0.2s ease;
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
        color: #e2e8f0;
    }
    
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