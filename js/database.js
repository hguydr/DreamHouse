// Работа с localStorage как с базой данных

const DB_NAME = 'houseProjectsDB';

// Инициализация базы данных
function initializeDatabase() {
    if (!localStorage.getItem(DB_NAME)) {
        const initialData = {
            projects: [],
            savedDesigns: [],
            contacts: []
        };
        localStorage.setItem(DB_NAME, JSON.stringify(initialData));
    }
}

// Получение всех данных
function getDatabase() {
    return JSON.parse(localStorage.getItem(DB_NAME)) || {};
}

// Сохранение данных
function saveDatabase(data) {
    localStorage.setItem(DB_NAME, JSON.stringify(data));
}

// Проекты для каталога
const sampleProjects = [
    {
        id: 1,
        name: "Современный коттедж",
        area: 150,
        style: "modern",
        price: 3500000,
        image: "images/лщеувяр.png",
        description: "Современный дом с панорамными окнами и открытой планировкой",
        features: ["3 спальни, ", "2 санузла, ", "гараж и ", "терраса"],
        constructionTime: "4 месяца"
    },
    {
        id: 2,
        name: "Классический дом",
        area: 120,
        style: "classic",
        price: 2800000,
        image: "images/classichouse.png",
        description: "Традиционный дом с классическим фасадом и уютным интерьером",
        features: ["2 спальни, ", "2 санузла, ", "кабинет и ", "веранда"],
        constructionTime: "3 месяца"
    },
    {
        id: 3,
        name: "Загородная вилла",
        area: 200,
        style: "modern",
        price: 5200000,
        image: "images/villa.webp",
        description: "Просторная вилла с бассейном и большим участком",
        features: ["4 спальни, ", "3 санузла, ", "бассейн и ", "сауна"],
        constructionTime: "6 месяцев"
    },
    {
        id: 4,
        name: "Скандинавский дом",
        area: 90,
        style: "scandinavian",
        price: 2200000,
        image: "images/scandinavskiy.jpg",
        description: "Уютный дом в скандинавском стиле с экологичными материалами",
        features: ["2 спальни, ", "1 санузел, ", "камин и ", "патио"],
        constructionTime: "2 месяца"
    },
    {
        id: 5,
        name: "Дуплекс",
        area: 180,
        style: "modern",
        price: 4200000,
        image: "images/dupleks.jpg",
        description: "Современный дуплекс для двух семей с отдельными входами",
        features: ["2 секции, ", "4 спальни, ", "2 гаража и ", "общий двор"],
        constructionTime: "5 месяцев"
    },
    {
        id: 6,
        name: "Эко-дом",
        area: 110,
        style: "scandinavian",
        price: 3100000,
        image: "images/eko.webp",
        description: "Экологичный дом из натуральных материалов с энергосберегающими технологиями",
        features: ["3 спальни, ", "2 санузла, ", "солнечные панели и ", "зимний сад"],
        constructionTime: "3 месяца"
    }
];

// Загрузка проектов в каталог
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    // Очищаем сетку
    projectsGrid.innerHTML = '';

    // Получаем текущие фильтры
    const areaFilter = document.getElementById('areaFilter')?.value || 'all';
    const styleFilter = document.getElementById('styleFilter')?.value || 'all';
    const priceFilter = document.getElementById('priceFilter')?.value || 'all';

    // Фильтруем проекты
    const filteredProjects = sampleProjects.filter(project => {
        // Фильтр по площади
        if (areaFilter !== 'all') {
            const [min, max] = areaFilter.split('-').map(val => 
                val.endsWith('+') ? parseInt(val) : parseInt(val)
            );
            if (areaFilter.endsWith('+')) {
                if (project.area < min) return false;
            } else {
                if (project.area < min || project.area > max) return false;
            }
        }

        // Фильтр по стилю
        if (styleFilter !== 'all' && project.style !== styleFilter) {
            return false;
        }

        // Фильтр по цене
        if (priceFilter !== 'all') {
            const priceInMillions = project.price / 1000000;
            const [min, max] = priceFilter.split('-').map(val => 
                val.endsWith('+') ? parseInt(val) : parseInt(val)
            );
            if (priceFilter.endsWith('+')) {
                if (priceInMillions < min) return false;
            } else {
                if (priceInMillions < min || priceInMillions > max) return false;
            }
        }

        return true;
    });

    // Отображаем отфильтрованные проекты
    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });

    // Если проектов нет, показываем сообщение
    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = '<div class="no-projects"><p>Проекты не найдены. Попробуйте изменить критерии поиска.</p></div>';
    }
}

// Создание карточки проекта
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card animate-slide-up';
    card.innerHTML = `
        <img src="${project.image}" alt="${project.name}" loading="lazy">
        <div class="project-info">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-features">
                ${project.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <div class="project-details">
                <p>Площадь: ${project.area} м²</p>
                <p>Срок: ${project.constructionTime}</p>
            </div>
            <div class="project-actions">
                <span class="project-price">от ${project.price.toLocaleString()} ₽</span>
                <button class="btn btn-outline" onclick="saveToFavorites(${project.id})">❤️ В избранное</button>
            </div>
        </div>
    `;
    return card;
}

// Применение фильтров
function applyFilters() {
    loadProjects();
}

// Сохранение в избранное
function saveToFavorites(projectId) {
    const db = getDatabase();
    const project = sampleProjects.find(p => p.id === projectId);
    
    if (project) {
        if (!db.favorites) {
            db.favorites = [];
        }
        
        // Проверяем, не добавлен ли уже проект
        if (!db.favorites.find(p => p.id === projectId)) {
            db.favorites.push(project);
            saveDatabase(db);
            showNotification('Проект добавлен в избранное!');
        } else {
            showNotification('Проект уже в избранном', 'info');
        }
    }
}

// Инициализация базы данных при загрузке
initializeDatabase();