## Тестовое задание Fullstack (Frontend часть)
<p align="center">
  <img src="./public/readme-pic-3.png" width="45%" />
  <img src="./public/readme-pic-2.png" width="45%" />
</p>

Backend для этого проекта: [https://github.com/ziaq/test-task-blog-nestjs-postgres-jwt](https://github.com/ziaq/test-task-blog-nestjs-postgres-jwt)

**Тестовое задание**  
Frontend для блога — приложение с модульной архитектурой, написанное с использованием  React + Vite + Tanstack Query + Zustand + Shadcn.

Включает в себя:
- Посты (создание, удаление, редактирование, добавление изображений)
- Профиль (создание, редактирование, загрузка аватара)
- Аутентификация по JWT (access + refresh)
- Восстановление access токена после обновления страницы из localStorage
- Fingerprint-защита refresh-токенов
- Загрузка изображений (drag and drop)
- Валидация данных с бэкенда и из форм через Zod
- Адаптивная верстка с использованием Tailwind CSS
- Кэширование запросов и оптимистичное обновление с Tanstack Query

Использовалось: React 19, Vite, TypeScript, Tailwind CSS, Shadcn UI, Zustand, Tanstack Query, React Hook Form, Zod, fingerprintjs

## Запуск проекта

1. Клонировать репозиторий

```
git clone https://github.com/ziaq/test-task-blog-react-shadcn.git
```

2. Перейти в директорию проекта
```
cd test-task-blog-react-shadcn
```

3. Установить зависимости

```
npm i
```

4. Создать `.env` файл в корне проекта, скопирвать туда:

```
VITE_API_URL=http://localhost:3001
```

5. Запустить проект

```
npm run dev
```

Приложенее будет доступно по адресу: [http://localhost:5171](http://localhost:5171 "http://localhost:5171")