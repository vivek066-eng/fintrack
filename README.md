# Fintrack

A full-stack personal finance tracker for managing income, expenses, and transactions.

## Tech Stack

**Backend**
- Java 17+ / Spring Boot 3.2.5
- Spring Security with JWT authentication
- Spring Data JPA / Hibernate
- MySQL
- Maven

**Frontend**
- Angular 17 (standalone components)
- Reactive Forms
- HTTP interceptor for JWT-based auth

## Features

- User registration and login with JWT-based authentication
- Secure password handling via Spring Security
- Transaction tracking (income/expense) linked to individual users
- Protected routes on the frontend (dashboard requires login)
- CORS-configured API for local frontend/backend development

## Project Structure

\\\
fintrack-project/
├── fintrack/
│   └── backend/          # Spring Boot backend
└── frontend/              # Angular frontend
\\\

## Getting Started

### Backend

1. Navigate to the backend folder:
   \\\
   cd fintrack/backend
   \\\
2. Configure your MySQL connection in \src/main/resources/application.properties\:
   \\\
   spring.datasource.url=jdbc:mysql://localhost:3306/fintrack_db?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=your_password
   \\\
3. Create the database in MySQL:
   \\\sql
   CREATE DATABASE fintrack_db;
   \\\
4. Run the application (via IntelliJ or Maven). It starts on \http://localhost:8080\.

### Frontend

1. Navigate to the frontend folder:
   \\\
   cd frontend
   \\\
2. Install dependencies:
   \\\
   npm install
   \\\
3. Start the dev server:
   \\\
   npm start
   \\\
4. Open \http://localhost:4200\ in your browser.

## API Endpoints

| Method | Endpoint             | Description         |
|--------|----------------------|----------------------|
| POST   | /api/auth/register   | Register a new user |
| POST   | /api/auth/login      | Log in and receive a JWT |

## License

This project is for personal/educational use.
