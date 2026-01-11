// ОСНОВНЫЕ СКРИПТЫ

document.addEventListener('DOMContentLoaded', () => {
    console.log('SMM сайт загружен');

    /* ===============================
       ПЛАВНАЯ ПРОКРУТКА
    =============================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const yOffset = -80;
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        });
    });

    /* ===============================
       АВТОГОД В ПОДВАЛЕ (БЕЗ КРАША)
    =============================== */
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const year = new Date().getFullYear();
        copyright.textContent = copyright.textContent.replace(/\d{4}/, year);
    }

    /* ===============================
       СИСТЕМНАЯ ИНФА (БЕЗ КРАША)
    =============================== */
    const systemInfo = document.querySelector('.system-info');

    function updateSystemInfo() {
        if (!systemInfo) return;

        const time = new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const load = Math.floor(Math.random() * 30) + 70;

        systemInfo.innerHTML = `
            <span>[TIME: ${time}]</span>
            <span>[LOAD: ${load}%]</span>
            <span>[VERSION: 2.4.1]</span>
        `;
    }

    updateSystemInfo();
    setInterval(updateSystemInfo, 60000);
});
