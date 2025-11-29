// Основной JavaScript файл

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeEventListeners();
});

// Инициализация навигации
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Инициализация анимаций
function initializeAnimations() {
    // Добавляем классы для анимаций при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами с анимациями
    document.querySelectorAll('.animate-slide-up, .animate-fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Инициализация обработчиков событий
function initializeEventListeners() {
    // Обработчик для слайдера площади
    const areaRange = document.getElementById('areaRange');
    if (areaRange) {
        areaRange.addEventListener('input', function() {
            const areaValue = document.getElementById('areaValue');
            if (areaValue) {
                areaValue.textContent = this.value;
            }
        });
    }

    // Обработчики для выбора опций в конструкторе
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            const type = this.dataset.type;
            const value = this.dataset.value;
            
            // Убираем активный класс у всех опций этого типа
            document.querySelectorAll(`.option[data-type="${type}"]`).forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Добавляем активный класс к выбранной опции
            this.classList.add('active');
            
            // Обновляем предпросмотр
            updateHousePreview();
        });
    });
}

// Показ уведомлений
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#2c5530' : '#dc3545'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем CSS для анимации уведомлений
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);