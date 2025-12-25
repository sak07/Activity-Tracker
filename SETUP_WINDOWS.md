# Installation Guide - Java and Maven

## Step 1: Install Java (JDK 17 or higher)

### Option A: Oracle JDK (Recommended)
1. Visit the Oracle Java download page.
2. Look for **JDK 21** (recommended) or **JDK 17** (minimum required).
3. Click on **Windows** tab.
4. Download the **x64 Installer** (`.exe` file).
5. Run the installer and follow the installation wizard.
6. Accept default settings.

### Option B: Alternative - Eclipse Temurin (OpenJDK)
If you prefer an open-source alternative:
1. Visit: https://adoptium.net/
2. Download **Temurin 21** for Windows.
3. Run the installer.

### Verify Java Installation
After installation, open a **new** PowerShell window and run:
```powershell
java -version
```

You should see output like:
```
java version "21.0.x" ...
```

---

## Step 2: Install Maven

### Option A: Using Chocolatey (Easiest)
If you have Chocolatey package manager:
```powershell
choco install maven
```

### Option B: Manual Installation
1. **Download Maven**
   - Visit: https://maven.apache.org/download.cgi
   - Download `apache-maven-3.9.x-bin.zip` (Binary zip archive).

2. **Extract Maven**
   - Extract to `C:\Program Files\Apache\maven`.
   - Or any location you prefer (avoid spaces in path).

3. **Set Environment Variables**
   - Open **System Properties** → **Environment Variables**.
   - Add new **System Variable**:
     - Variable name: `MAVEN_HOME`
     - Variable value: `C:\Program Files\Apache\maven` (your Maven path).
   
   - Edit **Path** variable (System variables):
     - Add new entry: `%MAVEN_HOME%\bin`.

4. **Verify Maven Installation**
   Open a **new** PowerShell window and run:
   ```powershell
   mvn -version
   ```

   You should see output like:
   ```
   Apache Maven 3.9.x ...
   ```

---

## Step 3: Run the Application

Once Java and Maven are installed:

### Start Backend (Terminal 1)
```powershell
cd Activity-Tracker-Task\backend
mvn spring-boot:run
```

Wait for the message: "Activity Tracker Backend is running!"

### Start Frontend (Terminal 2)
Open a **new** terminal window:
```powershell
cd Activity-Tracker-Task\frontend
npm install
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Database Console**: http://localhost:8080/h2-console

---

## Troubleshooting

### "java is not recognized"
- Make sure you opened a **new** PowerShell window after installation.
- Java installer usually adds to PATH automatically.
- If not, manually add Java to PATH:
  - Find Java installation (usually `C:\Program Files\Java\jdk-21`).
  - Add `C:\Program Files\Java\jdk-21\bin` to System PATH.

### "mvn is not recognized"
- Make sure you opened a **new** PowerShell window after installation.
- Verify `MAVEN_HOME` is set correctly.
- Verify `%MAVEN_HOME%\bin` is in PATH.

### Port Already in Use
If port 8080 or 3000 is already in use:
- Find and stop the process using that port.
- Or change the port in `application.properties` (backend) or Next.js config (frontend).

---

## Quick Start After Installation

Once everything is installed, just run these two commands in separate terminals:

**Terminal 1 (Backend):**
```powershell
cd Activity-Tracker-Task\backend
mvn spring-boot:run
```

**Terminal 2 (Frontend):**
```powershell
cd Activity-Tracker-Task\frontend
npm run dev
```

Then open http://localhost:3000 in your browser! 🎉
