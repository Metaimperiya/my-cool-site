// Используем самовызывающуюся функцию, чтобы изолировать код и не ловить ошибки дублей
(function() {
    console.log("Запуск внедрения стилей...");

    var myStyles = `
        /* Стили для JS-компонентов */
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
            font-family: sans-serif;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #48bb78, #38a169);
            text-align: center;
            color: white;
            transition: width 0.5s ease;
            width: 0%;
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

        .dark-theme { background: #1a202c; color: #e2e8f0; }
        .dark-theme .book-container { background: #2d3748; }

        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #48bb78;
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            z-index: 10000;
            opacity: 0;
            transition: all 0.3s ease;
        }

        .notification.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    `;

    // Создаем тег style только если его еще нет
    if (!document.getElementById('main-logic-styles')) {
        var styleSheet = document.createElement("style");
        styleSheet.id = 'main-logic-styles';
        styleSheet.textContent = myStyles;
        document.head.appendChild(styleSheet);
        console.log("✅ Стили успешно добавлены в Head!");
    }
})();