
// Текст для анимации
        const welcomeText = "Выбери свою мечту";
        let letters = [];
        
        // Функция инициализации анимации
        function initWelcomeAnimation() {
            const overlay = document.getElementById('welcomeOverlay');
            const textElement = document.getElementById('welcomeText');
            
            // Создаем элементы для каждой буквы
            for (let i = 0; i < welcomeText.length; i++) {
                const char = welcomeText[i];
                
                if (char === ' ') {
                    // Для пробела создаем отдельный элемент
                    const space = document.createElement('span');
                    space.className = 'space';
                    textElement.appendChild(space);
                } else {
                    // Для букв создаем отдельные элементы
                    const letter = document.createElement('span');
                    letter.className = 'letter';
                    letter.textContent = char;
                    textElement.appendChild(letter);
                    letters.push(letter);
                }
            }
            
            // Запускаем анимацию
            animateLetters();
        }
        
        // Функция анимации букв
        function animateLetters() {
            let delay = 0;
            
            // Появление букв по очереди
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.animation = 'letterAppear 0.5s forwards';
                }, delay);
                delay += 100; // Задержка между появлением букв
            });
            
            // После появления всех букв запускаем исчезновение
            setTimeout(() => {
                let disappearDelay = 0;
                
                // Исчезновение букв в обратном порядке
                for (let i = letters.length - 1; i >= 0; i--) {
                    setTimeout(() => {
                        letters[i].style.animation = 'letterDisappear 0.4s forwards';
                    }, disappearDelay);
                    disappearDelay += 80; // Задержка между исчезновением букв
                }
                
                // После исчезновения всех букв скрываем оверлей
                setTimeout(() => {
                    const overlay = document.getElementById('welcomeOverlay');
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.style.display = 'none';
                    }, 500);
                }, disappearDelay + 500);
                
            }, delay + 2000); // Ждем 2 секунды после появления всех букв
        }
        
        // Запускаем анимацию при загрузке страницы
        window.addEventListener('load', initWelcomeAnimation);

// Дополнительные анимации



// Плавный скролл к секциям
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем плавный скролл для всех внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Анимация появления элементов при скролле
    initScrollAnimations();
});

// Инициализация анимаций при скролле
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Наблюдаем за элементами с классами анимаций
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Анимация загрузки
function showLoading(element) {
    element.disabled = true;
    element.innerHTML = '<span class="loading"></span> Загрузка...';
}

function hideLoading(element, originalText) {
    element.disabled = false;
    element.textContent = originalText;
}

// Анимация счетчика
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Анимация параллакса
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Анимация ховера для карточек
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Анимация текста (появление букв)
function animateText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Анимация прогресс-бара
function animateProgressBar(bar, targetWidth, duration = 1000) {
    let startWidth = 0;
    const increment = targetWidth / (duration / 16);
    
    const timer = setInterval(() => {
        startWidth += increment;
        if (startWidth >= targetWidth) {
            bar.style.width = targetWidth + '%';
            clearInterval(timer);
        } else {
            bar.style.width = startWidth + '%';
        }
    }, 16);
}
