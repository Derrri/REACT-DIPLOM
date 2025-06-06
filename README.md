# Дипломная работа по профессии «Frontend-разработчик»

### Дипломная работа

#### 1. [Ссылка на проект](https://derrri.github.io/react-diplom/), опубликованный на githubPage
***Данные для авторизациии в админке (управление кинозалами, фильмами и сеансами):***
- Логин: `shfe-diplom@netology.ru`
- Пароль: `shfe-diplom`

#### 2. Стэк технологий, используемых в процессе работы над проектом

- **React** - библиотека для построения пользовательских интерфейсов.
- **ReactDOM** - библиотека для работы с DOM в приложениях React.
- **React Router** - библиотека для управления маршрутизацией в приложениях React.
- **Hooks (useState, useEffect, useContext)** - функции, позволяющие использовать состояние и другие возможности React в функциональных компонентах.
- **Functional Components** - стиль написания компонентов в React, использующий функции вместо классов.
- **Context API** - встроенный механизм React для управления состоянием и передачи данных через дерево компонентов.
- **Fetch API** - используется для выполнения HTTP-запросов к серверу.
- **Async/Await** - синтаксис для работы с асинхронными функциями в JavaScript.
- **CSS** - используется для стилизации компонентов.
- **JavaScript (ES6)** - язык программирования, используемый в коде.

### Цели дипломной работы

В этой дипломной работе вы создадите сайт для бронирования билетов в кинотеатр и разработаете информационную систему для администрирования залов, сеансов и предварительного бронирования билетов.

В результате выполнения дипломной работы вы:
- разработаете сайт бронирования билетов онлайн,
- разработаете административную часть сайта.

### Инструменты и дополнительные материалы, которые пригодятся для выполнения работы

- [Макеты страниц в Figma](https://www.figma.com/file/zGf2lm7mUBGeXWlZQyf9LH/%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-%D0%BC%D0%B0%D0%BA%D0%B5%D1%82-(1)?type=design&mode=design)
- [Информация по API](https://github.com/netology-code/shfe-diplom/blob/main/md/api.md).

### Описание проекта

#### 1. Сущности

- **Кинозал** – помещение, в котором демонстрируются фильмы. Режим работы определяется расписанием на день. Зал — прямоугольный, состоит из `N*M` различных зрительских мест.

- **Зрительское место** – место в кинозале. Зрительские места могут быть VIP и обычные.

- **Фильм** – информация о фильме заполняется администратором. Фильм связан с сеансом в кинозале.

- **Сеанс** – это временной промежуток, в котором в кинозале будет показываться фильм. На сеанс могут быть забронированы билеты.

- **Билет**  – QR-код c уникальным кодом бронирования, в котором обязательно указаны: Дата, Время, Название фильма, Зал, Ряд, Место, Стоимость, Фраза _"Билет действителен строго на свой сеанс"_.
  
Для генерации QR-кода можно использовать [QRCreator.js](https://github.com/slesareva-gala/QR-Code)

#### 2. Роли пользователей системы

-   Гость — неавторизованный посетитель сайта.
-   Администратор — авторизованный пользователь.

#### 3. Возможности гостя
-   Просмотр расписания
-   Просмотр информации о фильмах
-   Выбор места в кинозале
-   Бронирование билета

#### 4. Возможности администратора
-   Создание или редактирование залов.
-   Создание или редактирование списка фильмов.
-   Настройка цен.
-   Создание или редактирование расписания сеансов фильмов.

### Этапы разработки

1. Выполнить верстку предоставленных [макетов]((https://www.figma.com/file/BwhoRUEU4ikdbjjxFOrO7v/%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-%D0%BC%D0%B0%D0%BA%D0%B5%D1%82?type=design&node-id=0-1&mode=design&t=j9bYnoV4gt8q03IU-0))  
   * Верстка должна корректно отображаться в браузере chrome на устройствах с шириной экрана **320px** и более.  
   * В наименовании CSS-классов желательно придерживаться методологии [БЭМ](https://ru.bem.info/methodology/quick-start/)
   * Верстка должна быть валидной ([Валидатор](https://validator.w3.org/)). 
   * Для быстрой адаптации рекомендуем вам воспользоваться [системой сеток BootStrap](https://getbootstrap.su/docs/5.0/layout/grid/).
2. Разработка класс API для взаимодействия с [Backend](https://github.com/netology-code/shfe-diplom/blob/main/md/api.md).
3. Программирование админской части сайта.
4. Программирование клиентской части сайта.

### Правила приема работы

В личном кабинете отправлена ссылка на ваш ***Git-репозиторий***, в котором содержатся:
- все файлы проекта,
- файл Readme со ссылкой на ваш проект, опубликованный на ***githubPage***,
- описание стэка технологий, используемых вами в процессе работы над проектом.

### Как сделать самопроверку перед финальной сдачей диплома
1. [ ] Допускаются ошибки уровня warning, ошибки уровня error обязательно нужно исправить.
2. [ ] Полностью работает создание и удаление залов, фильмов и сеансов.
3. [ ] Корректно работает изменение схемы зала и стоимости билетов
4. [ ] Полностью работает заказ нужного билета с выбором посадочного места, сохранением данных в БД и получением QR кода
5. [ ] QR код содержит в себе полную информацию о билете (более подробно см описание сущности ***Билет*** выше)
6. [ ] В гостевой части на вкладке ***Сегодня*** прошедшие сеансы должны быть неактивны (чтобы не было возможности забронировать билет на уже прошедшие сеансы)
7. [ ] В гостевой части должны отображаться сеансы, которые проходят только в открытых залах.

### Часто задаваемые вопросы

>Как добавлять и удалять сеансы?

Добавление сеансов нужно производить при помощи drag&drop - перетаскивания фильма на ленту timeline нужного зала  
![](https://github.com/netology-code/shfe-diplom/blob/main/md/img/DD_Add.gif)
Удаление сеансов тоже производится при помощи drag&drop - перетаскивания сеанса с  ленты timeline за ее пределы  
![](https://github.com/netology-code/shfe-diplom/blob/main/md/img/DD_Delete.gif)

>Что значит кнопка «Открыть продажу билетов»?  

По умолчанию зал создаётся неактивным. После нажатия на эту кнопку зал становится доступным гостям. Надпись на кнопке меянется на «Приостановить продажу билетов».