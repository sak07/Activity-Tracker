# Activity Tracker Application

A full-stack application to record and retrieve user activities.

## Tech Stack

- **Backend**: Java Spring Boot 3.4.1, H2 Database
- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- Maven 3.6+

## Getting Started

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`.
   H2 Console is available at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:file:./data/activitytracker`, User: `sa`, Password: empty).

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`.

## Features

- **User Management**: Create and view users.
- **Activity Tracking**: Record activities with types, descriptions, and metadata.
- **Dashboard**: View recent activities and record new ones.
- **Filtering**: Filter activities by type.
- **Pagination**: Browse through large sets of activities.

## API Endpoints

- `GET /api/users` - List all users
- `POST /api/users` - Create a user
- `GET /api/activities` - List activities (paginated)
- `POST /api/activities` - Record an activity
- `GET /api/activities/type/{type}` - Filter by activity type
- `GET /api/activities/user/{userId}` - Filter by user
