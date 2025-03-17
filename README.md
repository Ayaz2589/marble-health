# Marble Health

This project was built as an assessment to demonstrate independent problem-solving and full-stack integration skills. The application uses Next.js (App Router) for the frontend, Prisma ORM for database interactions, and a Postgres database (running in Docker) for data storage. The project also leverages Material UI and react-big-calendar for a polished scheduling interface.

## Features

- **User Authentication:**  
  Basic authentication implemented with Prisma and Postgres. (NOT IMPLEMENTED FULLY)

- **Scheduling Calendar:**  
  A responsive calendar view using [react-big-calendar](https://github.com/jquense/react-big-calendar) integrated with Material UI for adding events via a modal interface.

- **Event CRUD Operations:**  
  API endpoints built with Next.js App Router handle creating and fetching calendar events, which are persisted in a Postgres database.

## Tech Stack

- **Frontend:**  
  Next.js (React), Material UI, react-big-calendar, date-fns

- **Backend:**  
  Next.js API Routes, Prisma ORM

- **Database:**  
  PostgreSQL (Dockerized)

- **Tools:**  
  ts-node, TypeScript

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/marble-health-take-home-assesment.git
   cd marble-health-take-home-assesment
   ```

  2. Install Dependencies:
  ```bash
    npm install
  ```

  3. Install Additional Dev Dependencies (if needed):
  ```bash
    npm install -D ts-node typescript @types/node
  ```

## Setup & Environment

- **Environment Variables:**
  Create a .env file at the root with the following (adjust values as needed):
```bash
  DATABASE_URL="postgresql://ayaz:password@localhost:5432/db"
  NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

- **Start The DB on docker:**
```bash
  docker compose down -v && docker compose up -d --build
```

## Database & Seeding

- **Run Migrations:**
```bash
  npx prisma migrate dev --name init
```

- **Generate Prisma Client:**
```bash
  npx prisma generate
```

- **Seed The Database:**
```bash
  npm run seed
```
