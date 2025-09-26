# 🍬 Sweet Shop Management System

A full-stack **Sweet Shop Management System** built using the **MERN** stack.  
This project demonstrates backend API development, database integration, frontend SPA implementation, authentication, and modern workflows, including AI-assisted development.  

---

## 🚀 Features

### 🔐 Authentication
- User Registration & Login  
- JWT-based authentication  
- Role-based authorization (User/Admin)  

### 🍭 Sweet Management (Protected)
- `POST /api/sweets` → Add a new sweet (Admin only)  
- `GET /api/sweets` → View all available sweets  
- `GET /api/sweets/search` → Search sweets by name, category, or price range  
- `PUT /api/sweets/:id` → Update sweet details (Admin only)  
- `DELETE /api/sweets/:id` → Delete a sweet (Admin only)  

### 📦 Inventory Management (Protected)
- `POST /api/sweets/:id/purchase` → Purchase a sweet (decreases stock)  
- `POST /api/sweets/:id/restock` → Restock a sweet (Admin only)  

### 🖥️ Frontend Features
- User registration & login forms  
- Dashboard displaying all sweets  
- Search & filter sweets  
- Purchase button (disabled if out of stock)  
- Admin panel to add/update/delete sweets  

---

## 🛠️ Tech Stack

### Backend
- **Node.js + Express**
- **MongoDB** database  
- **JWT Authentication**  
- **Jest** / **Supertest** for TDD  

### Frontend
- **React + Vite** (SPA)  
- **Axios** for API calls  
- **TailwindCSS** for styling  

---

## ⚡ Installation & Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
