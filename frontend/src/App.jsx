import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<ProtectedRoute adminOnly>
              <AdminPanel />
            </ProtectedRoute>} />
            <Route path="/admin_login" element={<AdminLogin />}/>
            <Route path="/admin_register" element={<AdminSignup />}/>
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
