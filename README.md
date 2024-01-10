# Chat App

## Overview

Welcome to the Chat App! This real-time messaging application features a distributed backend with multiple WebSocket servers, an Express server, a load balancer powered by HAProxy, Prisma ORM for database interactions, PostgreSQL for persistent data storage, and Redis Pub/Sub for WebSocket server communication. The entire backend is Dockerized using Docker Compose for easy deployment.

The frontend, built with React, offers a seamless user experience with features like user authentication, automatic session/cookie expiry checking, online and offline user indicators, and the ability to create multiple chat rooms with unlimited users.

## Backend Features

### WebSocket Servers

- Multiple WebSocket servers for handling real-time communication.
- Redis Pub/Sub to facilitate communication and coordination between WebSocket servers.
- Persistent messages and rooms to ensure a seamless user experience.

### Express Server

- An Express server providing API routes for user authentication and other functionalities.
- Cookie-based authentication for secure API access.

### Load Balancer (HAProxy)

- Load balancing using HAProxy to distribute incoming traffic across multiple WebSocket servers, ensuring scalability and high availability.

### Database

- Prisma ORM for efficient and type-safe database interactions.
- PostgreSQL as the database for storing persistent chat data.

### Dockerized Backend

- Docker Compose for containerization, allowing for easy deployment and management of the entire backend system.

## Frontend Features

### React Application

- User-friendly React application for a smooth chat experience.

### Authentication

- User authentication using cookies for secure and seamless access.
- Automatic session and cookie expiry checking to enhance security.

### Chat Room Functionality

- Create multiple chat rooms to organize conversations.
- Unlimited users in each room for a dynamic and collaborative environment.
- Notification for new user joined and user left.

### Online and Offline Indicators

- Real-time indicators to show the online and offline status of users.

## Getting Started
#### Prerequisite: Docker(with docker compose) and Typescript should be installed on your system before setting up.

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chat-app.git
2. Navigate to the project directory:
   ```bash
   cd chat-app
   npm install
3. Build the project:
   ```bash
   tsc
4. Start the backend using Docker Compose:
   ```bash
   docker-compose up -d
5. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm start dev
6. Access the application at http://localhost:5173 in your browser.







