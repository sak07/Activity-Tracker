#!/bin/bash
echo "Starting Activity Tracker Backend..."

# Navigate to backend directory
cd backend

# Run the application
if command -v mvnd &> /dev/null
then
    echo "Using Maven Daemon (mvnd)..."
    mvnd spring-boot:run
else
    echo "Maven Daemon not found, using standard Maven (mvn)..."
    mvn spring-boot:run
fi
