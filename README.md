# Task Management App

This is a simple web application for managing tasks. It provides a user interface for adding, viewing, updating, and deleting tasks.

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- External Libraries: Axios
- Error Handling: Custom error handling middleware

## Getting Started

1. Clone this repository:

   ```bash
   cd task-management-app```
   
2. Install dependencies for both the frontend and backend:

   ```cd <Task Manager Website location>
   npm install```

4. Configure your MongoDB connection by creating a .env file in the backend directory and setting the MONGO_URI variable:
  MONGO_URI=your_mongodb_uri

5. Start the development server:
  ```npm start```

6. Go to local host address in your website by using (default port: 3000):
  ```http://localhost:<PORT>/```


# Backend API Endpoints:
GET /api/v1/tasks: Get all tasks.
POST /api/v1/tasks: Create a new task.
GET /api/v1/tasks/:id: Get a single task by ID.
PUT /api/v1/tasks/:id: Update a task by ID.
DELETE /api/v1/tasks/:id: Delete a task by ID.

# Frontend
The frontend uses HTML, CSS, and JavaScript to display tasks, add new tasks, and manage existing tasks.

# Backend
The backend is built using Node.js and Express.js. It provides RESTful API endpoints for managing tasks. It also handles database interactions using MongoDB through Mongoose.

# Error Handling
Custom error handling middleware is implemented to provide meaningful error responses to clients. It catches instances of CustomAPIError and returns appropriate error messages and status codes.
