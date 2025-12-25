@echo off
echo Setting up environment variables...

REM Set Java Home and Path
set "JAVA_HOME=C:\Program Files\Java\jdk-21"
set "PATH=%JAVA_HOME%\bin;C:\Program Files\Apache\maven\bin;%PATH%"

echo Verifying versions...
java -version
call mvnd -version

echo.
echo Starting Activity Tracker Backend...
cd backend
call mvnd spring-boot:run
pause
