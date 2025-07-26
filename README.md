# 🧑‍💻 Online Judge Platform

A full-stack web platform for practicing coding problems with secure code execution, real-time evaluation, and detailed performance tracking.

## 🚀 Live Demo

- 🌐 Live App: [https://mainproject-six.vercel.app](https://mainproject-six.vercel.app)
- 🎥 Demo Video: [Loom Walkthrough](https://www.loom.com/share/ce8034eb3beb439192e9fbbb1462edcf?sid=e3ce6166-ea34-41d6-803d-dc742294f7ff)

---

## 📌 Features

- 🧾 **User Authentication**: Secure login/signup with token-based authentication.
- 🧠 **Multi-language Code Submission**: Write and run code in languages like C++, Python (more can be added).
- 🧪 **Robust Judging Engine**: Each problem has test cases and returns real-time verdicts for each submission.
- 🛡️ **Sandboxed Execution**: Code runs in isolated Docker containers to ensure safety and resource control.
- 📊 **Leaderboard**: Tracks user rankings based on problem-solving activity.
- 📆 **Activity Calendar**: Visualizes daily problem-solving stats.
- 📝 **Submission History**: View past submissions with verdicts and timestamps.
- 🧩 **Admin Problem Management**: Admin users can create, edit, and delete problems and test cases.

---

## 🧑‍💻 Tech Stack

### Frontend

- React
- Tailwind CSS
- Vercel for hosting

### Backend

- Django
- Django REST Framework
- PostgreSQL
- Docker (for containerization)
- AWS EC2 (for hosting)
- Amazon ECR (for storing Docker images)

---

## ⚙️ Deployment Overview

### Backend

1. Dockerized Django backend.
2. Built and pushed to **Amazon ECR**.
3. Pulled on **AWS EC2**, where containers run with Docker socket access for spawning runner containers.

### Frontend

- React app deployed on **Vercel**.

### DNS Setup

- Uses **DuckDNS** to dynamically update the domain in case of EC2 IP changes.

---


