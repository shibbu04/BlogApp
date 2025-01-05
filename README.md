# Blog Platform

A modern blog platform built with React, Node.js, and PostgreSQL.

## Features

- User authentication with JWT
- Blog post creation and management
- Comment system
- Responsive design
- Docker containerization

## Prerequisites

- Node.js 20+
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Getting Started

1. Clone the repository
2. Copy environment files:
   ```bash
   cp backend/.env.example backend/.env
   ```

3. Install dependencies:
   ```bash
   npm run install:all
   ```

4. Start the development servers:
   ```bash
   npm run dev
   ```

## Docker Deployment

1. Build and start containers:
   ```bash
   docker-compose up --build
   ```

## AWS EC2 Deployment

1. Launch an EC2 instance
2. Install Docker and Docker Compose
3. Clone the repository
4. Configure environment variables
5. Run docker-compose up

## Project Structure

```
.
├── frontend/           # React frontend
├── backend/           # Node.js backend
├── docker-compose.yml
└── README.md
```

## API Documentation

### User Service
- POST /register - Register new user
- POST /login - User login
- GET /users/:id - Get user profile
- PUT /users/:id - Update user profile
- DELETE /users/:id - Delete user

### Blog Service
- POST /blogs - Create blog post
- GET /blogs - List blog posts
- GET /blogs/:id - Get single post
- PUT /blogs/:id - Update post
- DELETE /blogs/:id - Delete post

### Comment Service
- POST /comments - Create comment
- GET /comments?post_id=:id - Get post comments