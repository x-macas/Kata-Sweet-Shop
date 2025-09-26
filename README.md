# 🍬 Sweet Shop Management System

A full-stack **Sweet Shop Management System** built using the **MERN** stack.  
This project demonstrates backend API development, database integration, frontend SPA implementation, authentication, and modern workflows, including AI-assisted development. 

## 🌍 Deployment
Live Demo: https://bytesizedtreats.netlify.app 

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

### 🧩 Environment Variables 
Create a **`.env`** file inside the `backend` folder and add: 
```
env MONGO_URI = <your_mongodb_connection_string>
JWT_SECRET = <your_jwt_secret>
PORT = 5000
``` 
Replace the placeholder values with your actual credentials. 

## 📸 Screenshots

### Dashboard
<img width="1305" height="928" alt="image" src="https://github.com/user-attachments/assets/b8486d2a-789a-4567-8ea9-f9057958713e" />

### Admin Dashboard
<img width="1238" height="930" alt="image" src="https://github.com/user-attachments/assets/9de1a616-c290-4f44-9168-4d5a3f6dea5d" />


### Login/Sign up page
<img width="472" height="768" alt="image" src="https://github.com/user-attachments/assets/8e239049-e7b2-42a3-ac54-d2ed2359a732" />


## 📜 My AI Usage

During the development of the Sweet Shop Management System, I utilized AI tools to enhance productivity and streamline specific tasks. These tools acted as assistants, helping with repetitive tasks and providing suggestions, while I maintained control over the architecture and implementation.

### Tools Used:
- **ChatGPT**: Provided ideas for API structures, suggested improvements for route handlers, and helped brainstorm test cases.
- **GitHub Copilot**: Assisted with autocompletion for boilerplate code and repetitive frontend components.

### How I Used Them:
- Used ChatGPT to brainstorm efficient MongoDB queries and search/filter endpoint structures.
- Leveraged Copilot to autocomplete React components like forms and tables, saving time on repetitive coding.
- Asked ChatGPT for suggestions on unit and integration test cases to ensure comprehensive test coverage.
- Used AI tools to validate folder structures, naming conventions, and RESTful API patterns.

### Reflection on AI Impact:
- AI tools helped reduce development time by providing quick suggestions and autocompletions.
- They ensured consistency in code style and naming conventions across the project.
- While AI provided valuable assistance, the core logic, architecture, and decision-making were handled manually, ensuring the project met high-quality standards.
- Overall, AI served as a productivity enhancer, allowing me to focus on critical aspects of the system while minimizing repetitive
