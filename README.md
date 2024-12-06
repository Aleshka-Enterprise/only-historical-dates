# only-historical-dates

## Описание

Это приложение реализует блок, который отображает информацию о временных отрезках, в каждом из которых существует несколько событий. При переключении временных отрезков обновляются соответствующие числа, и под ними отображается новый слайдер, содержащий подробную информацию о ключевых событиях на активном временном отрезке.

### Основные особенности:
- Возможность существования от 2 до 6 временных отрезков.
- Интерактивные точки на окружности размещаются на одинаковом расстоянии друг от друга.
- Блок полностью независим от другой логики на странице, что позволяет добавлять несколько таких блоков без нарушения верстки и логики.

## Требования к реализации

- **Язык программирования**: TypeScript
- **Фреймворк**: React.js
- **Стилизация**: SASS/SCSS (возможно использование styled-components)
- **Сборка проекта**: Webpack
- **Библиотека для слайдеров**: Swiper
- **Библиотека для анимаций**: GSAP
- **Запреты**:
  - Не использовать jQuery
  - Не использовать Bootstrap, Tailwind и другие CSS-фреймворки
  - Не использовать библиотеки с готовыми UI-компонентами, такие как Material-UI, Ant Design и т.д.

## Установка и запуск проекта

Для запуска проекта выполните следующие шаги:

1. **Клонируйте репозиторий**:
    ```bash
    git clone git@github.com:Aleshka-Enterprise/only-historical-dates.git
    cd only-historical-dates
    ```

2. **Установите зависимости**:
    ```bash
    npm install
    ```

3. **Запустите проект**:
    ```bash
    npm start
    ```

4. **Откройте в браузере**:
    Перейдите по адресу [http://localhost:3000](http://localhost:3000) для просмотра приложения.

## Демонстрация

Для примера работы блока с максимальным количеством временных отрезков, вы можете ознакомиться с [демонстрацией](https://disk.yandex.ru/d/um6QeDGxLT8wnQ).
