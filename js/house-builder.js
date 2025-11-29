function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
}

class HouseBuilder {
    constructor() {
        this.currentConfig = {
            house: 'cottage',
            material: 'brick',
            style: 'modern',
            area: 120,
            floors: '2'
        };

        this.priceConfig = {
            house: {
                cottage: 20000,
                villa: 35000,
                duplex: 25000
            },
            material: {
                brick: 1.2,
                wood: 1.5,
                concrete: 1.0
            },
            style: {
                modern: 1.3,
                classic: 1.1,
                scandinavian: 1.2
            },
            floors: {
                '1': 1.0,
                '2': 1.8,
                '3': 2.5
            }
        };

        this.imageMap = {
            cottage: {
                brick: {
                    modern: 'images/kottedzhbrickmodern.jpg',
                    classic: 'images/kotbrickclass.webp',
                    scandinavian: 'images/kotscanbrick.jpg'
                },
                wood: {
                    modern: 'images/kottedzhwoodmodern.jpg',
                    classic: 'images/kotwoodclass.jpg',
                    scandinavian: 'images/kotscanwood.jpg'
                },
                concrete: {
                    modern: 'images/kottedzhbetonmodern.jpg',
                    classic: 'images/kotbetonclass.webp',
                    scandinavian: 'images/kotscanbeton.jpg'
                }
            },
            villa: {
                brick: {
                    modern: 'images/villabrickmodern.jpeg',
                    classic: 'images/villaclassbrick.jpg',
                    scandinavian: 'images/villascandbrick.jpg'
                },
                wood: {
                    modern: 'images/villawoodmodern.jpg',
                    classic: 'images/villawoodclass.jpg',
                    scandinavian: 'images/villascandwood.jpg'
                },
                concrete: {
                    modern: 'images/villamodernbeton.jpg',
                    classic: 'images/villaclassbeton.jpg',
                    scandinavian: 'images/villascanbeton.jpg'
                }
            },
            duplex: {
                brick: {
                    modern: 'images/duplexbrickmodern.jpg',
                    classic: 'images/duplexbrickclass.jpg',
                    scandinavian: 'images/duplexbrickscan.jpg'
                },
                wood: {
                    modern: 'images/duplexwoodmodern.png',
                    classic: 'images/duplexwoodclass.png',
                    scandinavian: 'images/duplexwoodscan.jpg'
                },
                concrete: {
                    modern: 'images/duplexbetonmodern.jpg',
                    classic: 'images/duplexbetonclass.jpg',
                    scandinavian: 'images/duplexbetonscan.webp'
                }
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updatePreview();
        this.updatePrice();
    }

    bindEvents() {
        // Обработчики для опций
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                const value = e.currentTarget.dataset.value;
                
                this.setOption(type, value);
                this.updateSelection(type, e.currentTarget);
            });
        });

        // Обработчик для слайдера площади
        const areaSlider = document.getElementById('areaRange');
        const areaValue = document.getElementById('areaValue');
        
        areaSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            areaValue.textContent = value;
            this.currentConfig.area = parseInt(value);
            this.updatePreview();
            this.updatePrice();
        });

        // Инициализация выбранных опций
        this.initializeSelections();
    }

    initializeSelections() {
        // Выбираем первые опции по умолчанию
        document.querySelectorAll('[data-type]').forEach(option => {
            const type = option.dataset.type;
            if (option.dataset.value === this.currentConfig[type]) {
                option.classList.add('selected');
            }
        });
    }

setOption(type, value) {
    this.currentConfig[type] = value;
    this.updatePreview();
    this.updatePrice(); // Добавьте эту строку
}

    updateSelection(type, selectedElement) {
        // Убираем выделение у всех опций этого типа
        document.querySelectorAll(`[data-type="${type}"]`).forEach(option => {
            option.classList.remove('selected');
        });
        
        // Добавляем выделение выбранной опции
        selectedElement.classList.add('selected');
    }

    updatePreview() {
        const { house, material, style } = this.currentConfig;
        const previewImage = document.getElementById('previewImage');
        
        // Плавное исчезновение
        previewImage.style.opacity = '0';
        
        setTimeout(() => {
            const imageUrl = this.imageMap[house]?.[material]?.[style] || this.imageMap.cottage.brick.modern;
            previewImage.src = imageUrl;
            previewImage.alt = `${house} ${material} ${style}`;
            
            // Плавное появление
            previewImage.style.opacity = '1';
        }, 200);

        this.updateInfoPanel();
    }

    updateInfoPanel() {
        const typeNames = {
            cottage: 'Коттедж',
            villa: 'Вилла',
            duplex: 'Дуплекс'
        };

        const materialNames = {
            brick: 'Кирпич',
            wood: 'Дерево',
            concrete: 'Бетон'
        };

        const styleNames = {
            modern: 'Современный',
            classic: 'Классический',
            scandinavian: 'Скандинавский'
        };

        const floorNames = {
            '1': '1 этаж',
            '2': '2 этажа',
            '3': '3 этажа'
        };

        document.getElementById('infoType').textContent = typeNames[this.currentConfig.house];
        document.getElementById('infoMaterial').textContent = materialNames[this.currentConfig.material];
        document.getElementById('infoStyle').textContent = styleNames[this.currentConfig.style];
        document.getElementById('infoArea').textContent = `${this.currentConfig.area} м²`;
        document.getElementById('infoFloors').textContent = floorNames[this.currentConfig.floors];
    }

    updatePrice() {
        const { house, material, style, area, floors } = this.currentConfig;
        
        const basePrice = this.priceConfig.house[house];
        const materialMultiplier = this.priceConfig.material[material];
        const styleMultiplier = this.priceConfig.style[style];
        const floorsMultiplier = this.priceConfig.floors[floors];
        
        const totalPrice = Math.round(basePrice * area * materialMultiplier * styleMultiplier * floorsMultiplier);
        
        document.getElementById('infoPrice').textContent = formatPrice(totalPrice);
    }


    
    getCurrentConfig() {
        return { ...this.currentConfig };
    }
}

// Функция для получения данных из формы
function getFormData() {
    return {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value || 'Не указано',
        date: new Date().toLocaleDateString('ru-RU')
    };
}

// Функция проверки формы
function validateForm(formData) {
    if (!formData.name.trim()) {
        showNotification('Пожалуйста, введите ваше имя', 'error');
        return false;
    }
    if (!formData.phone.trim()) {
        showNotification('Пожалуйста, введите ваш телефон', 'error');
        return false;
    }
    if (!formData.email.trim()) {
        showNotification('Пожалуйста, введите ваш email', 'error');
        return false;
    }
    return true;
}

// Обновленная функция отправки в Telegram
async function sendOrderToTelegram(orderData, formData) {
    const botToken = '8342427582:AAFagpwwgdy3UGqPDZA8_W8bVHXUwL7RL6c';
    const chatId = '552793585';
    
    const typeNames = {
        cottage: 'Коттедж',
        villa: 'Вилла',
        duplex: 'Дуплекс'
    };

    const materialNames = {
        brick: 'Кирпич',
        wood: 'Дерево',
        concrete: 'Бетон'
    };

    const styleNames = {
        modern: 'Современный',
        classic: 'Классический',
        scandinavian: 'Скандинавский'
    };

    const floorNames = {
        '1': '1 этаж',
        '2': '2 этажа',
        '3': '3 этажа'
    };

    const message = `
НОВЫЙ ЗАКАЗ ДОМА

🏠 Тип дома: ${typeNames[orderData.house]}
🧱 Материал: ${materialNames[orderData.material]}
🎨 Стиль: ${styleNames[orderData.style]}
📐 Площадь: ${orderData.area} м²
🏢 Этажность: ${floorNames[orderData.floors]}
💰 Стоимость: ${formatPrice(orderData.price)}

ДАННЫЕ ЗАКАЗЧИКА

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
📧 Email: ${formData.email}
💬 Сообщение: ${formData.message}

⏰ Время заказа: ${new Date().toLocaleString('ru-RU')}
    `;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const result = await response.json();
        console.log('Telegram response:', result);
        return result.ok;
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        return false;
    }
}

// Исправленная функция заказа
async function orderProject() {
    if (!houseBuilder) {
        showNotification('Ошибка: конструктор домов не загружен', 'error');
        return;
    }
    
    // Получаем данные из формы
    const formData = getFormData();
    
    // Проверяем обязательные поля
    if (!validateForm(formData)) {
        return;
    }
    
    // Получаем данные проекта
    const projectData = houseBuilder.getCurrentConfig();
    
    // Рассчитываем стоимость
    const { house, material, style, area, floors } = projectData;
    const basePrice = houseBuilder.priceConfig.house[house];
    const materialMultiplier = houseBuilder.priceConfig.material[material];
    const styleMultiplier = houseBuilder.priceConfig.style[style];
    const floorsMultiplier = houseBuilder.priceConfig.floors[floors];
    
    const totalPrice = Math.round(basePrice * area * materialMultiplier * styleMultiplier * floorsMultiplier);
    
    const orderData = {
        ...projectData,
        price: totalPrice
    };
    
    // Показываем уведомление о отправке
    showNotification('Отправляем заказ...', 'info');
    
    // Отправляем в Telegram
    const success = await sendOrderToTelegram(orderData, formData);
    
    if (success) {
        showNotification('Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Очищаем форму после успешной отправки
        document.getElementById('contactForm').reset();
        
        // Закрываем модальное окно (если нужно)
        // closeModal();
        
    } else {
        showNotification('Ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.', 'error');
    }
}

// Функция показа уведомлений (добавьте если нет)
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        transition: all 0.3s ease;
    `;
    
    // Цвета в зависимости от типа
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    // Добавляем на страницу
    document.body.appendChild(notification);
    
    // Удаляем через 5 секунд
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Глобальный экземпляр конструктора
let houseBuilder;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    houseBuilder = new HouseBuilder();
});

// Функции для кнопок
function saveProject() {
    if (!houseBuilder) return;
    
    const projectData = houseBuilder.getCurrentConfig();
    const savedProject = projectDB.saveProject(projectData);
    
    if (savedProject) {
        showNotification('Проект успешно сохранен!', 'success');
    } else {
        showNotification('Ошибка при сохранении проекта', 'error');
    }
}

function loadProject() {
    const projects = projectDB.getAllProjects();
    
    if (projects.length === 0) {
        showNotification('Нет сохраненных проектов', 'error');
        return;
    }

    // Простой выбор последнего проекта
    const lastProject = projects[projects.length - 1];
    
    // В реальном приложении здесь можно показать модальное окно с выбором проекта
    if (confirm(`Загрузить последний проект "${lastProject.name}"?`)) {
        houseBuilder.currentConfig = { ...lastProject };
        houseBuilder.updatePreview();
        houseBuilder.updatePrice();
        houseBuilder.initializeSelections();
        showNotification('Проект загружен!', 'success');
    }
}