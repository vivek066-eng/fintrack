# 💰 FinTrack – Personal Expense & Banking Dashboard

A full-stack personal finance tracker with JWT authentication and visual analytics
for income vs. expense, built for a fresher resume/portfolio.

## Tech Stack
- **Backend:** Java 17, Spring Boot 3.2, Spring Security (JWT), Spring Data JPA
- **Database:** MySQL
- **Frontend:** Angular 17 (standalone components), Chart.js (ng2-charts)

## Features
- User registration & login secured with JWT
- Add / edit / delete income & expense transactions
- Dashboard with total income, total expense, and balance
- Pie chart: expense breakdown by category
- Line chart: monthly income vs. expense trend
- Filter transactions by type (income / expense)
- Recent transactions table

## Project Structure
```
fintrack/
├── backend/          # Spring Boot REST API
│   └── src/main/java/com/fintrack/
│       ├── config/        # Security config
│       ├── security/      # JWT util + filter
│       ├── model/         # JPA entities
│       ├── repository/    # Spring Data repositories
│       ├── dto/           # Request/response DTOs
│       ├── service/       # Business logic
│       ├── controller/    # REST controllers
│       └── exception/     # Global exception handling
└── frontend/         # Angular app
    └── src/app/
        ├── auth/           # Login & register
        ├── dashboard/      # Charts + summary
        ├── transactions/   # CRUD list + form
        ├── services/       # HTTP services
        ├── guards/         # Route auth guard
        ├── interceptors/   # JWT auth interceptor
        └── models/         # TypeScript interfaces
```

## Setup Instructions

### 1. Database
Create a MySQL database (or let the app auto-create it):
```sql
CREATE DATABASE fintrack_db;
```
Update credentials in `backend/src/main/resources/application.properties`:
```
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

### 2. Backend
```bash
cd backend
mvn spring-boot:run
```
API runs on `http://localhost:8080`

### 3. Frontend
```bash
cd frontend
npm install
ng serve
```
App runs on `http://localhost:4200`

## API Endpoints

| Method | Endpoint                  | Description              | Auth |
|--------|----------------------------|---------------------------|------|
| POST   | /api/auth/register         | Register new user         | No   |
| POST   | /api/auth/login             | Login, returns JWT        | No   |
| GET    | /api/transactions           | List all transactions     | Yes  |
| POST   | /api/transactions           | Create transaction        | Yes  |
| PUT    | /api/transactions/{id}      | Update transaction        | Yes  |
| DELETE | /api/transactions/{id}      | Delete transaction        | Yes  |
| GET    | /api/dashboard/summary      | Get income/expense summary + chart data | Yes |

## Resume Bullet Points (suggested)
- Built FinTrack, a full-stack personal finance dashboard using Spring Boot, Angular,
  and MySQL with JWT-secured REST APIs for multi-user transaction management.
- Implemented income/expense CRUD with category-based analytics, rendering interactive
  pie and line charts (Chart.js) for spending trends and monthly comparisons.
- Designed a stateless authentication flow using Spring Security and JWT, with route
  guards and HTTP interceptors on the Angular frontend for protected routes.
