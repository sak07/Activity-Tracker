# Activity Tracker Backend

Spring Boot application for tracking user activities.

## Configuration

- **Port**: 8080
- **Database**: H2 (Embedded)
- **Data Location**: `./data/activitytracker`

## Running

```bash
mvn spring-boot:run
```

## API Documentation

The API is RESTful and consumes/produces JSON.

### Users
- `POST /api/users`: Create user
- `GET /api/users`: List users

### Activities
- `POST /api/activities`: Record activity
- `GET /api/activities`: List activities
