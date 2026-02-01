// Основной объект приложения
const ChecklistApp = {
    // Инициализация
    init() {
        this.currentList = {
            id: null,
            title: "Мой новый чек-лист",
            items: [],
            sections: ['Основной список'],
            colorTheme: 'default',
            showProgress: true,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };

        this.savedLists = JSON.parse(localStorage.getItem('checklist_lists')) || [];
        this.templates = this.loadTemplates();

        this.bindEvents();
        this.renderTemplates();
        this.renderSavedLists();
        this.setupDefaultList();
        this.updateStats();

        // Установка темы
        if (localStorage.getItem('checklist_theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelector('#themeToggle i').className = 'fas fa-sun';
        }
    },

    // Загрузка шаблонов
    loadTemplates() {
        return [
            {
                id: 1,
                title: "Подготовка к отпуску",
                category: "travel",
                icon: "fas fa-plane",
                description: "Все необходимое для путешествия",
                items: [
                    { text: "Проверить загранпаспорт (срок действия)", done: false, important: true },
                    { text: "Купить билеты", done: false, important: true },
                    { text: "Забронировать отель/квартиру", done: false, important: true },
                    { text: "Оформить страховку", done: false, important: false },
                    { text: "Уведомить банк о поездке", done: false, important: false },
                    { text: "Снять наличные в валюте", done: false, important: false },
                    { text: "Распечатать брони", done: false, important: true },
                    { text: "Собрать аптечку", done: false, important: false },
                    { text: "Зарядить гаджеты и пауэрбанк", done: false, important: true }
                ],
                sections: ['За 2 недели', 'За 1 неделю', 'За 1 день'],
                itemCount: 9
            },
            {
                id: 2,
                title: "Переезд в новую квартиру",
                category: "home",
                icon: "fas fa-home",
                description: "Организация переезда без стресса",
                items: [
                    { text: "Найти транспорт для перевозки", done: false, important: true },
                    { text: "Заказать упаковочные материалы", done: false, important: false },
                    { text: "Упаковать ненужные вещи заранее", done: false, important: false },
                    { text: "Оформить переадресацию почты", done: false, important: true },
                    { text: "Сообщить о переезде в банк", done: false, important: false },
                    { text: "Заказать чистку новой квартиры", done: false, important: false },
                    { text: "Запланировать день переезда", done: false, important: true },
                    { text: "Подключить интернет в новой квартире", done: false, important: true }
                ],
                sections: ['За месяц', 'За 2 недели', 'За 1 неделю', 'В день переезда'],
                itemCount: 8
            },
            {
                id: 3,
                title: "Ежедневные утренние ритуалы",
                category: "health",
                icon: "fas fa-sun",
                description: "Начните день правильно",
                items: [
                    { text: "Выпить стакан воды", done: false, important: false },
                    { text: "Сделать зарядку/растяжку", done: false, important: true },
                    { text: "Принять душ", done: false, important: false },
                    { text: "Заправить постель", done: false, important: false },
                    { text: "Позавтракать", done: false, important: true },
                    { text: "Запланировать задачи на день", done: false, important: true },
                    { text: "Медитация/дыхательные упражнения", done: false, important: false }
                ],
                sections: ['Утренние ритуалы'],
                itemCount: 7
            },
            {
                id: 4,
                title: "Подготовка к собеседованию",
                category: "work",
                icon: "fas fa-briefcase",
                description: "Уверенность и подготовка",
                items: [
                    { text: "Изучить информацию о компании", done: false, important: true },
                    { text: "Подготовить ответы на частые вопросы", done: false, important: true },
                    { text: "Подготовить вопросы к интервьюеру", done: false, important: false },
                    { text: "Подготовить портфолио/резюме", done: false, important: true },
                    { text: "Подобрать одежду", done: false, important: false },
                    { text: "Протестировать технику (для онлайн-собеседования)", done: false, important: true },
                    { text: "Продумать маршрут и время в пути", done: false, important: false }
                ],
                sections: ['Подготовка', 'В день собеседования'],
                itemCount: 7
            },
            {
                id: 5,
                title: "Планирование свадьбы",
                category: "events",
                icon: "fas fa-ring",
                description: "Организация важного события",
                items: [
                    { text: "Определить бюджет", done: false, important: true },
                    { text: "Выбрать и забронировать место проведения", done: false, important: true },
                    { text: "Составить список гостей", done: false, important: false },
                    { text: "Выбрать и заказать наряды", done: false, important: false },
                    { text: "Найти фотографа и оператора", done: false, important: true },
                    { text: "Заказать торт", done: false, important: false },
                    { text: "Разослать приглашения", done: false, important: true }
                ],
                sections: ['За 12 месяцев', 'За 6 месяцев', 'За 3 месяца', 'За 1 месяц'],
                itemCount: 7
            },
            {
                id: 6,
                title: "Запуск нового проекта",
                category: "work",
                icon: "fas fa-rocket",
                description: "Старт проекта с правильными шагами",
                items: [
                    { text: "Определить цели и задачи проекта", done: false, important: true },
                    { text: "Составить план проекта и сроки", done: false, important: true },
                    { text: "Определить бюджет", done: false, important: true },
                    { text: "Сформировать команду", done: false, important: false },
                    { text: "Провести анализ конкурентов", done: false, important: false },
                    { text: "Создать прототип/макет", done: false, important: true },
                    { text: "Назначить ответственных за задачи", done: false, important: false }
                ],
                sections: ['Инициализация', 'Планирование', 'Подготовка'],
                itemCount: 7
            }
        ];
    },

    // Навигация по страницам
    bindEvents() {
        // Навигация
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                this.showPage(page);

                // Обновляем активную кнопку
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Кнопка "Начать создавать"
        document.getElementById('startCreating').addEventListener('click', () => {
            this.showPage('creator');
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-page="creator"]').classList.add('active');
        });

        // Создание первого списка
        document.getElementById('createFirstList')?.addEventListener('click', () => {
            this.showPage('creator');
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-page="creator"]').classList.add('active');
        });

        // Создание нового списка
        document.getElementById('createNewList')?.addEventListener('click', () => {
            this.currentList = {
                id: null,
                title: "Мой новый чек-лист",
                items: [],
                sections: ['Основной список'],
                colorTheme: 'default',
                showProgress: true,
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString()
            };
            this.renderChecklist();
            this.updateStats();

            this.showPage('creator');
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-page="creator"]').classList.add('active');
        });

        // Переключение темы
        document.getElementById('themeToggle').addEventListener('click', () => {
            const html = document.documentElement;
            const icon = document.querySelector('#themeToggle i');

            if (html.getAttribute('data-theme') === 'dark') {
                html.removeAttribute('data-theme');
                icon.className = 'fas fa-moon';
                localStorage.setItem('checklist_theme', 'light');
            } else {
                html.setAttribute('data-theme', 'dark');
                icon.className = 'fas fa-sun';
                localStorage.setItem('checklist_theme', 'dark');
            }
        });

        // Название списка
        document.getElementById('listTitle').addEventListener('input', (e) => {
            this.currentList.title = e.target.value;
            this.currentList.lastModified = new Date().toISOString();
        });

        // Добавление пункта
        document.getElementById('addItem').addEventListener('click', () => {
            this.showAddItemModal();
        });

        // Добавление раздела
        document.getElementById('addSection').addEventListener('click', () => {
            const sectionName = prompt('Введите название нового раздела:', 'Новый раздел');
            if (sectionName && sectionName.trim() !== '') {
                this.currentList.sections.push(sectionName.trim());
                this.renderChecklist();
            }
        });

        // Сохранение списка
        document.getElementById('saveList').addEventListener('click', () => {
            this.saveCurrentList();
        });

        // Очистка списка
        document.getElementById('clearList').addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите очистить список? Все пункты будут удалены.')) {
                this.currentList.items = [];
                this.renderChecklist();
                this.updateStats();
            }
        });

        // Поделиться списком
        document.getElementById('shareList').addEventListener('click', () => {
            this.generateShareLink();
        });

        // Копирование ссылки
        document.getElementById('copyLink').addEventListener('click', () => {
            const urlInput = document.getElementById('shareUrl');
            urlInput.select();
            document.execCommand('copy');
            this.showNotification('Ссылка скопирована в буфер обмена!');
        });

        // Экспорт в PDF
        document.getElementById('exportPDF').addEventListener('click', () => {
            this.exportToPDF();
        });

        // Печать
        document.getElementById('printList').addEventListener('click', () => {
            window.print();
        });

        // Настройки
        document.getElementById('progressBarToggle').addEventListener('change', (e) => {
            this.currentList.showProgress = e.target.checked;
            this.updateStats();
        });

        document.getElementById('colorTheme').addEventListener('change', (e) => {
            this.currentList.colorTheme = e.target.value;
            this.applyColorTheme();
        });

        // Категории шаблонов
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;

                // Обновляем активную кнопку
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Фильтруем шаблоны
                this.filterTemplates(category);
            });
        });

        // Модальное окно
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.hideModal();
        });

        document.querySelector('.modal-cancel').addEventListener('click', () => {
            this.hideModal();
        });

        document.querySelector('.modal-confirm').addEventListener('click', () => {
            this.addItemFromModal();
        });

        // Закрытие модального окна по клику вне его
        document.getElementById('addItemModal').addEventListener('click', (e) => {
            if (e.target.id === 'addItemModal') {
                this.hideModal();
            }
        });
    },

    // Показать страницу
    showPage(pageName) {
        // Скрыть все страницы
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Показать нужную страницу
        document.getElementById(`${pageName}-page`).classList.add('active');

        // Обновляем данные если нужно
        if (pageName === 'my-lists') {
            this.renderSavedLists();
        }
    },

    // Рендер шаблонов
    renderTemplates() {
        // Главная страница
        const previewGrid = document.querySelector('.templates-grid');
        const templatesContainer = document.querySelector('.templates-container');
        const sidebarTemplates = document.querySelector('.templates-sidebar');

        if (previewGrid) {
            previewGrid.innerHTML = '';
            this.templates.slice(0, 3).forEach(template => {
                previewGrid.appendChild(this.createTemplateCard(template));
            });
        }

        if (templatesContainer) {
            templatesContainer.innerHTML = '';
            this.templates.forEach(template => {
                templatesContainer.appendChild(this.createTemplateCard(template));
            });
        }

        if (sidebarTemplates) {
            sidebarTemplates.innerHTML = '';
            this.templates.forEach(template => {
                const item = document.createElement('div');
                item.className = 'template-sidebar-item';
                item.innerHTML = `<i class="${template.icon}"></i> ${template.title}`;
                item.addEventListener('click', () => {
                    this.loadTemplate(template);
                    this.showNotification(`Шаблон "${template.title}" загружен!`);
                });
                sidebarTemplates.appendChild(item);
            });
        }
    },

    // Создание карточки шаблона
    createTemplateCard(template) {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.dataset.category = template.category;

        // Определяем цвет категории
        const categoryColors = {
            travel: '#4361ee',
            events: '#7209b7',
            work: '#f8961e',
            home: '#4cc9f0',
            health: '#2a9d8f'
        };

        card.innerHTML = `
            <div class="template-header">
                <i class="${template.icon}" style="color: ${categoryColors[template.category] || '#4361ee'}"></i>
                <span class="template-category">${this.getCategoryName(template.category)}</span>
            </div>
            <h4>${template.title}</h4>
            <p>${template.description}</p>
            <div class="template-stats">
                <span><i class="fas fa-tasks"></i> ${template.itemCount} пунктов</span>
                <span><i class="fas fa-layer-group"></i> ${template.sections.length} разделов</span>
            </div>
        `;

        card.addEventListener('click', () => {
            this.loadTemplate(template);
            this.showPage('creator');
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-page="creator"]').classList.add('active');
            this.showNotification(`Шаблон "${template.title}" загружен!`);
        });

        return card;
    },

    // Получить название категории
    getCategoryName(category) {
        const names = {
            travel: 'Путешествия',
            events: 'События',
            work: 'Работа',
            home: 'Дом',
            health: 'Здоровье',
            all: 'Все'
        };
        return names[category] || category;
    },

    // Фильтрация шаблонов по категории
    filterTemplates(category) {
        const templates = document.querySelectorAll('.template-card');

        templates.forEach(template => {
            if (category === 'all' || template.dataset.category === category) {
                template.style.display = 'block';
            } else {
                template.style.display = 'none';
            }
        });
    },

    // Загрузка шаблона
    loadTemplate(template) {
        this.currentList = {
            id: null,
            title: template.title,
            items: JSON.parse(JSON.stringify(template.items)), // Глубокое копирование
            sections: [...template.sections],
            colorTheme: 'default',
            showProgress: true,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };

        // Обновляем интерфейс
        document.getElementById('listTitle').value = template.title;
        this.renderChecklist();
        this.updateStats();
    },

    // Рендер чек-листа
    renderChecklist() {
        const container = document.getElementById('checklistContainer');

        if (this.currentList.items.length === 0) {
            container.innerHTML = `
                <div class="checklist-empty">
                    <i class="fas fa-clipboard"></i>
                    <p>Ваш чек-лист пуст. Добавьте первый пункт или загрузите шаблон.</p>
                </div>
            `;
            return;
        }

        let html = '';

        // Группируем пункты по разделам
        const itemsBySection = {};
        this.currentList.items.forEach((item, index) => {
            const section = item.section || this.currentList.sections[0];
            if (!itemsBySection[section]) {
                itemsBySection[section] = [];
            }
            itemsBySection[section].push({ ...item, index });
        });

        // Рендерим разделы
        this.currentList.sections.forEach(section => {
            if (itemsBySection[section] && itemsBySection[section].length > 0) {
                html += `<div class="section-header">${section}</div>`;

                itemsBySection[section].forEach(itemData => {
                    const item = itemData.item || itemData;
                    const index = itemData.index;

                    html += `
                        <div class="checklist-item ${item.done ? 'done' : ''} ${item.important ? 'important' : ''}" data-index="${index}">
                            <div class="checkbox ${item.done ? 'checked' : ''}"></div>
                            <div class="item-text ${item.done ? 'done' : ''}">${item.text}</div>
                            <div class="item-actions">
                                <button class="item-btn edit" title="Редактировать">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="item-btn delete" title="Удалить">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;
                });
            }
        });

        container.innerHTML = html;

        // Привязываем события
        this.bindChecklistEvents();
    },

    // Привязка событий к элементам чек-листа
    bindChecklistEvents() {
        // Чекбоксы
        document.querySelectorAll('.checkbox').forEach((checkbox, index) => {
            checkbox.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleItem(index);
            });
        });

        // Текст пункта
        document.querySelectorAll('.item-text').forEach((textElement, index) => {
            textElement.addEventListener('click', () => {
                this.toggleItem(index);
            });
        });

        // Кнопка редактирования
        document.querySelectorAll('.item-btn.edit').forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editItem(i);
            });
        });

        // Кнопка удаления
        document.querySelectorAll('.item-btn.delete').forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteItem(i);
            });
        });
    },

    // Переключение состояния пункта
    toggleItem(index) {
        if (this.currentList.items[index]) {
            this.currentList.items[index].done = !this.currentList.items[index].done;
            this.currentList.lastModified = new Date().toISOString();
            this.renderChecklist();
            this.updateStats();
        }
    },

    // Редактирование пункта
    editItem(index) {
        const item = this.currentList.items[index];
        const newText = prompt('Редактировать пункт:', item.text);

        if (newText !== null && newText.trim() !== '') {
            this.currentList.items[index].text = newText.trim();
            this.currentList.lastModified = new Date().toISOString();
            this.renderChecklist();
            this.showNotification('Пункт обновлен!');
        }
    },

    // Удаление пункта
    deleteItem(index) {
        if (confirm('Удалить этот пункт?')) {
            this.currentList.items.splice(index, 1);
            this.currentList.lastModified = new Date().toISOString();
            this.renderChecklist();
            this.updateStats();
            this.showNotification('Пункт удален!');
        }
    },

    // Показать модальное окно добавления пункта
    showAddItemModal() {
        const modal = document.getElementById('addItemModal');
        const sectionSelect = document.getElementById('itemSection');

        // Заполняем выпадающий список разделов
        sectionSelect.innerHTML = '';
        this.currentList.sections.forEach(section => {
            const option = document.createElement('option');
            option.value = section;
            option.textContent = section;
            sectionSelect.appendChild(option);
        });

        // Сбрасываем форму
        document.getElementById('itemText').value = '';
        document.getElementById('itemImportant').checked = false;

        // Показываем модальное окно
        modal.classList.add('active');
        document.getElementById('itemText').focus();
    },

    // Скрыть модальное окно
    hideModal() {
        document.getElementById('addItemModal').classList.remove('active');
    },

    // Добавить пункт из модального окна
    addItemFromModal() {
        const text = document.getElementById('itemText').value.trim();
        const section = document.getElementById('itemSection').value;
        const important = document.getElementById('itemImportant').checked;

        if (text === '') {
            alert('Введите текст пункта!');
            return;
        }

        this.currentList.items.push({
            text,
            section,
            important,
            done: false
        });

        this.currentList.lastModified = new Date().toISOString();
        this.renderChecklist();
        this.updateStats();
        this.hideModal();
        this.showNotification('Пункт добавлен!');
    },

    // Обновление статистики
    updateStats() {
        const total = this.currentList.items.length;
        const done = this.currentList.items.filter(item => item.done).length;
        const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

        // Обновляем текст
        document.getElementById('progressText').textContent = `${done}/${total} выполнено`;

        // Обновляем прогресс-бар
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${percentage}%`;

        // Показываем/скрываем прогресс-бар
        if (!this.currentList.showProgress) {
            progressFill.parentElement.style.display = 'none';
            document.getElementById('progressText').style.display = 'none';
        } else {
            progressFill.parentElement.style.display = 'block';
            document.getElementById('progressText').style.display = 'block';
        }

        // Применяем цветовую тему
        this.applyColorTheme();
    },

    // Применить цветовую тему
    applyColorTheme() {
        const themes = {
            default: '#4361ee',
            green: '#2a9d8f',
            purple: '#7209b7',
            orange: '#f8961e'
        };

        const color = themes[this.currentList.colorTheme] || '#4361ee';
        document.documentElement.style.setProperty('--primary-color', color);

        // Темные варианты
        const darkColors = {
            default: '#3a56d4',
            green: '#21867a',
            purple: '#61089c',
            orange: '#e0871b'
        };

        const darkColor = darkColors[this.currentList.colorTheme] || '#3a56d4';
        document.documentElement.style.setProperty('--primary-dark', darkColor);
    },

    // Сохранение текущего списка
    saveCurrentList() {
        if (this.currentList.items.length === 0) {
            alert('Добавьте хотя бы один пункт перед сохранением!');
            return;
        }

        // Создаем ID если его нет
        if (!this.currentList.id) {
            this.currentList.id = Date.now().toString();
            this.currentList.createdAt = new Date().toISOString();
        }

        this.currentList.lastModified = new Date().toISOString();

        // Проверяем, есть ли уже список с таким ID
        const existingIndex = this.savedLists.findIndex(list => list.id === this.currentList.id);

        if (existingIndex > -1) {
            // Обновляем существующий
            this.savedLists[existingIndex] = { ...this.currentList };
        } else {
            // Добавляем новый
            this.savedLists.unshift({ ...this.currentList });
        }

        // Сохраняем в localStorage
        localStorage.setItem('checklist_lists', JSON.stringify(this.savedLists));

        // Обновляем список сохраненных
        this.renderSavedLists();

        // Показываем уведомление
        this.showNotification('Чек-лист сохранен!');

        // Генерируем ссылку для общего доступа
        this.generateShareLink();
    },

    // Рендер сохраненных списков
    renderSavedLists() {
        const container = document.querySelector('.saved-lists');
        const emptyMessage = document.getElementById('empty-lists-message');

        if (this.savedLists.length === 0) {
            if (emptyMessage) emptyMessage.style.display = 'block';
            if (container) container.innerHTML = '';
            return;
        }

        if (emptyMessage) emptyMessage.style.display = 'none';

        if (!container) return;

        let html = '<div class="lists-grid">';

        this.savedLists.forEach(list => {
            const doneCount = list.items.filter(item => item.done).length;
            const totalCount = list.items.length;
            const percentage = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
            const date = new Date(list.lastModified).toLocaleDateString('ru-RU');

            html += `
                <div class="template-card saved-list" data-id="${list.id}">
                    <div class="template-header">
                        <i class="fas fa-list-check" style="color: var(--primary-color)"></i>
                        <span class="template-category">${percentage}% готово</span>
                    </div>
                    <h4>${list.title}</h4>
                    <p>${list.items.length} пунктов, обновлен ${date}</p>
                    <div class="template-stats">
                        <span><i class="fas fa-check-circle"></i> ${doneCount}/${totalCount}</span>
                        <span><i class="fas fa-calendar"></i> ${date}</span>
                    </div>
                    <div class="list-actions">
                        <button class="btn btn-small open-list" data-id="${list.id}">Открыть</button>
                        <button class="btn btn-small btn-outline delete-list" data-id="${list.id}">Удалить</button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;

        // Привязываем события
        document.querySelectorAll('.open-list').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                this.openSavedList(id);
            });
        });

        document.querySelectorAll('.delete-list').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                this.deleteSavedList(id);
            });
        });

        document.querySelectorAll('.saved-list').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const id = card.dataset.id;
                    this.openSavedList(id);
                }
            });
        });
    },

    // Открыть сохраненный список
    openSavedList(id) {
        const list = this.savedLists.find(l => l.id === id);
        if (list) {
            this.currentList = { ...list };
            document.getElementById('listTitle').value = list.title;
            this.renderChecklist();
            this.updateStats();
            this.showPage('creator');
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-page="creator"]').classList.add('active');
            this.showNotification('Чек-лист загружен!');
        }
    },

    // Удалить сохраненный список
    deleteSavedList(id) {
        if (confirm('Удалить этот чек-лист?')) {
            this.savedLists = this.savedLists.filter(list => list.id !== id);
            localStorage.setItem('checklist_lists', JSON.stringify(this.savedLists));
            this.renderSavedLists();
            this.showNotification('Чек-лист удален!');

            // Если удаляем текущий открытый список
            if (this.currentList.id === id) {
                this.currentList = {
                    id: null,
                    title: "Мой новый чек-лист",
                    items: [],
                    sections: ['Основной список'],
                    colorTheme: 'default',
                    showProgress: true,
                    createdAt: new Date().toISOString(),
                    lastModified: new Date().toISOString()
                };
                this.renderChecklist();
                this.updateStats();
            }
        }
    },

    // Создание ссылки для общего доступа
    generateShareLink() {
        if (this.currentList.items.length === 0) {
            alert('Добавьте пункты в чек-лист, чтобы поделиться им!');
            return;
        }

        // Сохраняем список если он еще не сохранен
        if (!this.currentList.id) {
            this.saveCurrentList();
        }

        // Создаем ссылку (в реальном приложении это был бы серверный эндпоинт)
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}#/list/${this.currentList.id}`;

        document.getElementById('shareUrl').value = shareUrl;
        this.showNotification('Ссылка для общего доступа создана!');
    },

    // Экспорт в PDF
    exportToPDF() {
        if (this.currentList.items.length === 0) {
            alert('Добавьте пункты в чек-лист для экспорта!');
            return;
        }

        // В реальном приложении здесь был бы вызов библиотеки для генерации PDF
        // Для демо создаем текстовый файл
        let content = `ЧЕК-ЛИСТ: ${this.currentList.title}\n`;
        content += `Создан: ${new Date(this.currentList.createdAt).toLocaleDateString('ru-RU')}\n`;
        content += `Статус: ${this.currentList.items.filter(i => i.done).length}/${this.currentList.items.length} выполнено\n\n`;

        // Группируем по разделам
        const itemsBySection = {};
        this.currentList.items.forEach(item => {
            const section = item.section || this.currentList.sections[0];
            if (!itemsBySection[section]) {
                itemsBySection[section] = [];
            }
            itemsBySection[section].push(item);
        });

        // Добавляем пункты
        this.currentList.sections.forEach(section => {
            if (itemsBySection[section] && itemsBySection[section].length > 0) {
                content += `\n${section.toUpperCase()}:\n`;
                itemsBySection[section].forEach((item, i) => {
                    const status = item.done ? '[✓]' : '[ ]';
                    const important = item.important ? ' ⚠' : '';
                    content += `${status} ${item.text}${important}\n`;
                });
            }
        });

        // Создаем и скачиваем файл
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `чек-лист_${this.currentList.title.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Чек-лист экспортирован!');
    },

    // Настройка списка по умолчанию
    setupDefaultList() {
        // Добавляем несколько примеров для нового списка
        if (this.currentList.items.length === 0) {
            this.currentList.items = [
                { text: "Пример выполненной задачи", done: true, important: false },
                { text: "Пример важной задачи", done: false, important: true },
                { text: "Пример обычной задачи", done: false, important: false }
            ];
            this.renderChecklist();
        }
    },

    // Показать уведомление
    showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
};

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    ChecklistApp.init();
});