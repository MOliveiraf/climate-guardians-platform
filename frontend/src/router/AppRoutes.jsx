import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import Register from "../pages/Register";
import Teacher from "../pages/Teacher";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redireciona rota inicial */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
         {/* Rota exclusiva TEACHER */}
        <Route 
          path="/teacher" 
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <Teacher />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}