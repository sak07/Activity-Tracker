# 🏃 How to Run the Application

Follow these steps to get the Activity Tracker up and running on your local machine after cloning.

## 1. Backend (Spring Boot)

### Using the Script (Recommended)
- **macOS/Linux**:
  ```bash
  chmod +x run_backend.sh
  ./run_backend.sh
  ```
- **Windows**:
  ```powershell
  ./run_backend.bat
  ```

### Manual Way
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Run with Maven:
   ```bash
   mvn spring-boot:run
   ```
   *The backend will be available at `http://localhost:8080`*

---

## 2. Frontend (Next.js)

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies (First time only):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:3000`*

---

## 🛠️ Common Commands

| Task | Command | Directory |
| :--- | :--- | :--- |
| Build Backend | `mvn clean install` | `/backend` |
| Run Backend | `mvn spring-boot:run` | `/backend` |
| Install Frontend Deps | `npm install` | `/frontend` |
| Run Frontend | `npm run dev` | `/frontend` |
| Build Frontend | `npm run build` | `/frontend` |

## 🌐 Access Points
- **Web App**: [http://localhost:3000](http://localhost:3000)
- **API Base URL**: [http://localhost:8080/api](http://localhost:8080/api)
- **H2 Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  - *JDBC URL*: `jdbc:h2:mem:activitydb`
  - *User*: `sa`
  - *Password*: (empty)
