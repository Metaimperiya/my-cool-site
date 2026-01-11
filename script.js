// ОСНОВНЫЕ СКРИПТЫ

document.addEventListener('DOMContentLoaded', function() {
    console.log('SMM сайт загружен');
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Обновление года в подвале
    const year = new Date().getFullYear();
    document.querySelector('.copyright').textContent = 
        document.querySelector('.copyright').textContent.replace('2024', year);
    
    // Обновление системной информации
    function updateSystemInfo() {
        const time = new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
        const load = Math.floor(Math.random() * 30) + 70;
        
        document.querySelector('.system-info').innerHTML = `
            <span>[TIME: ${time}]</span>
            <span>[LOAD: ${load}%]</span>
            <span>[VERSION: 2.4.1]</span>
        `;
    }
    
    updateSystemInfo();
    setInterval(updateSystemInfo, 60000);
});