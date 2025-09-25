# 🍭 Kata Sweet Shop

A full-stack web application for a delightful sweet shop, built with the MERN stack (MongoDB, Express.js, React, Node.js).

This project features a complete user authentication system, an admin panel for managing inventory, and a clean, modern user interface for customers to browse and purchase sweets.

## ✨ Features

- **User Authentication**: Secure user registration and login for customers.
- **Admin Role**: Separate registration and login for administrators with a unique passkey.
- **Admin Panel**: Admins can create, update, and delete sweets from the inventory.
- **Sweet Management**: Admins can also manage stock levels by restocking items.
- **Public Browsing**: All users can view the list of available sweets.
- **Search & Filter**: Customers can search for sweets by name, category, or price range.
- **Purchase Simulation**: Authenticated users can "purchase" a sweet, which decrements its quantity.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Context API for state management
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest & Supertest for backend API testing

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later)
- npm
- MongoDB (a local instance or a cloud-hosted one like MongoDB Atlas)

### Backend Setup

1.  **Navigate to the backend directory**:
    ```sh
    cd backend
    ```

2.  **Install dependencies**:
    ```sh
    npm install
    ```

3.  **Create a `.env` file** in the `backend` directory and add the following environment variables. Replace the placeholder values with your own.
    ```
    PORT=4000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ADMIN_PASSKEY=your_secret_admin_passkey
    ```

4.  **Run the server**:
    ```sh
    npm run dev
    ```
    The backend server will start on `http://localhost:4000`.

### Frontend Setup

1.  **Navigate to the frontend directory** in a new terminal:
    ```sh
    cd frontend
    ```

2.  **Install dependencies**:
    ```sh
    npm install
    ```

3.  **Run the development server**:
    ```sh
    npm run dev
    ```
    The frontend development server will start on `http://localhost:5173`.

## 📝 API Endpoints

- `POST /api/auth/register` - Register a new user or admin.
- `POST /api/auth/login` - Login for users and admins.
- `GET /api/sweets` - Get a list of all sweets.
- `GET /api/sweets/search` - Search for sweets with filters.
- `POST /api/sweets` - (Admin) Create a new sweet.
- `PUT /api/sweets/:id` - (Admin) Update an existing sweet.
- `DELETE /api/sweets/:id` - (Admin) Delete a sweet.
- `POST /api/sweets/:id/purchase` - (User) Purchase a sweet.
- `POST /api/sweets/:id/restock` - (Admin) Restock a sweet.