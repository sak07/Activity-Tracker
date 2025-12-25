# Mac Setup Guide

This project requires Java 21 and Maven.

## 1. Install Homebrew
If you don't have Homebrew installed, run this command in your terminal:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## 2. Install Java (OpenJDK 21)
```bash
brew install openjdk@21
```
After installing, you might need to symlink it to make it the default:
```bash
sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk
```

## 3. Install Maven
```bash
brew install maven
```

## 4. Run the Backend
Once installed, you can run the backend with:
```bash
./run_backend.sh
```
