MIT License

Copyright (c) [2024] [vISHVAJEET DESHMUKH]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Task Management System

This project is a simple task management system where users can register, login, view tasks, create new tasks, update task status, and logout.

# Features

### User Authentication

Users can register with unique credentials and then login using the same credentials.

### Dashboard

Shows all the tasks created by the user.

### Task Filtering

Users can filter tasks based on their status (To Do, Done, In Progress).

### Task Details

Clicking on a task card reveals detailed information about the task, including options to change the status or delete the task.

### Create Task

Users can add new tasks through a dedicated form.

### Logout

Users can log out of their account.

# Tech-Stack - MERN

### Backend

Node.js: Runtime environment for server-side code.
Express.js: Web application framework for Node.js.
express-session: Middleware for session management.

### Versions

Nodejs: 20.11.0
npx: 10.2.4

### Client

React.js: JavaScript library for building user interfaces.
React Router: Declarative routing for React applications.
It uses port 3000

### Server

Backend is developed using expressjs version 4.19.2
It uses port 3001

# Folder structure

The project is structured as follows

pesto-task/
├── backend/
│ ├── controller/ # Contains controllers for handling business logic
│ ├── middleware/ # Contains middleware functions
│ ├── routes/ # Contains route definitions
│ ├── database-schema/ # Contains database schema definitions
│ ├── utils/ # Contains utility functions
│ ├── index.js # Entry point for the backend application
│ ├── .env # Environment variables configuration file
│ └── ... # Other backend-related files and folders
├── frontend/
│ ├── public/ # Public assets and HTML template
│ ├── src/ # Source code for the frontend application
│ │ ├── components/ # Reusable UI components
│ │ ├── authentication/ # Components and logic related to user authentication
│ │ ├── pages/ # Components representing different pages/routes
│ │ ├── App.tsx # Main component file
│ │ ├── index.tsx # Entry point for the frontend application
│ │ └── App.css # Styles for the main component
│ └── ... # Other frontend-related files and folders
├── README.md # Project README file
└── ... # Other project-related files and folders

## Available Scripts

In the /pesto-task you can run

### `npm install`

This installs the concurrently module

### `npm run install-all`

Installs all the dependencies for both the server and client.

### `npm run watch`

Starts the project, concurrently running the frontend and backend servers.

# How to run

Clone the repository.
Navigate to `/pesto-task` directory.
Run `npm install` to install concurrently module.
Run `npm run install-all` to install dependencies.
Run `npm run watch` to start the project.

Now, you can access the application at `http://localhost:3000` for the frontend and `http://localhost:3001` for the backend.
