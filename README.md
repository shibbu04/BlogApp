# ✨ Multi-Service Blog Platform ✨

## **Objective**

Develop and deploy a multi-service blog platform using Docker containers and AWS. This project demonstrates containerization, service orchestration, backend development, and cloud deployment expertise.

---

## **Project Overview**

The blog platform consists of the following services:

### **🔑 User Service**

- Handles user authentication and profile management.
- Uses **JWT** for authentication and **bcrypt** for secure password hashing.

**Exposed Endpoints:**

- `POST /register/` – Register a new user.
- `POST /login/` – Authenticate a user.
- `GET /users/<id>` – Retrieve user details.
- `PUT /users/<id>` – Edit user details.
- `DELETE /users/<id>` – Delete a user.

### **📈 Blog Service**

- Manages blog posts with support for pagination.

**Exposed Endpoints:**

- `POST /blogs/` – Create a new blog post.
- `GET /blogs/` – List all blog posts.
- `GET /blogs/<id>` – Fetch a specific blog post.
- `PUT /blogs/<id>` – Edit an existing blog post.
- `DELETE /blogs/<id>` – Delete a blog post.

### **💬 Comment Service**

- Handles comments for blog posts.
- Initially uses a flat structure, extendable for nested comments.

**Exposed Endpoints:**

- `POST /comments/` – Add a comment to a blog post.
- `GET /comments?post_id=<id>` – List comments for a specific blog post.

### **💳 Database Service**

- Uses **PostgreSQL** for data storage.
- Each service has its own schema to maintain separation of concerns.

---

## **Tech Stack 🛠️**

- **Backend:** Node.js, Express.js
- **Frontend:** React with TypeScript
- **Database:** PostgreSQL
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Cloud Deployment:** AWS (EC2, RDS for PostgreSQL)

---

## **Project Structure 📁**

```
project-root/
├── backend/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── schemas/
│   ├── config/
│   ├── Dockerfile
├── frontend/
│   ├── src/
│   ├── App.tsx
│   ├── components/
│   ├── pages/
│   ├── Dockerfile
├── docker-compose.yml
├── .env
```

---

## **Setup and Installation 🔧**

### **Prerequisites**

- Node.js
- Docker and Docker Compose
- AWS CLI (for deployment)
- PostgreSQL client (optional for local debugging)

### **Local Development Setup**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shibbu04/BlogApp
   cd BlogApp

   cd frontend
   npm install
   npm run dev

   cd backend
   npm install
   npm start
   ```



1. **Set up environment variables:** Create a backend/ `.env` file in the backend root directory with the following and replace your **user** and **password** in the **postgresql** connection string:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/blogdb
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

2. **Set up environment** variables: Create a frontend/ .env file in the frontend root directory with the following:

                `VITE_API_URL=http://localhost:3000/api`

1. **Start the application:**

   ```bash
   docker-compose up --build
   ```

2. **Access the services:**

   - API: `http://localhost:3000/api`
   - Frontend: `http://localhost:5173`

---

## **AWS Deployment 🌐**

1. **Launch an EC2 instance:**

   - Use an Amazon Linux 2 or Ubuntu AMI.
   - Install Docker and Docker Compose on the instance.

2. **Configure PostgreSQL RDS:**

   - Create an RDS instance for PostgreSQL.
   - Note the connection string for the `.env` file.

3. **Deploy the application:**

   - Transfer project files to the EC2 instance using `scp` or a similar method.
   - SSH into the EC2 instance.
   - Run the following commands:
     ```bash
     docker-compose up --build -d
     ```

4. **Set up HTTPS:**

   - Use a reverse proxy like Nginx with Let's Encrypt for SSL.

---

## **API Documentation 🔄**

### **User Service**

- **Register a new user:**
  ```http
  POST /register/
  ```
- **Login a user:**
  ```http
  POST /login/
  ```
- **Retrieve user details:**
  ```http
  GET /users/<id>
  ```

### **Blog Service**

- **Create a blog post:**
  ```http
  POST /blogs/
  ```
- **List all blog posts:**
  ```http
  GET /blogs/
  ```

### **Comment Service**

- **Add a comment to a blog post:**
  ```http
  POST /comments/
  ```
- **List comments for a blog post:**
  ```http
  GET /comments?post_id=<id>
  ```

---

## **Deliverables 📢**

1. **Codebase:**

   - Backend code for User, Blog, and Comment services.
   - Dockerfile for each service.
   - `docker-compose.yml` for orchestration.

2. **Deployment Guide:**

   - Instructions for local setup and AWS deployment.

3. **Live Application:**

   - URL secured with HTTPS.

---

## **Evaluation Criteria ✅**

- **Docker Skills:** Efficient Dockerfile creation and orchestration.
- **AWS Deployment:** Functional endpoints on a live application.
- **Code Quality:** Clean, modular, and well-documented code.
- **Documentation:** Comprehensive and user-friendly.

---

### **Made with ❤️ by Shivam**
