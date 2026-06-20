import { Routes, Route } from "react-router-dom";
import Register
from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import UploadDocument from "../pages/UploadDocument";
import Documents from "../pages/Documents";
import Workflow from "../pages/Workflow";
import Settings from "../pages/Settings";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Analytics from "../pages/Analytics";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";
import OCRWorkspace from "../pages/OCRWorkspace";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />}/>
      <Route path="/" element={<Login />} />
      <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/workflow" element={<Workflow />} />
        <Route
  path="/ocr"
  element={<OCRWorkspace />}
/>
        <Route
  path="/notifications"
  element={<Notifications />}
/>
    
       <Route
  path="/profile"
  element={<Profile />}
/>
        <Route path="/settings" element={<Settings />}/>
        <Route
  path="/analytics"
  element={<Analytics />}
/>
      </Route>
    </Routes>
  );
}