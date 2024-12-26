import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Devices from "./pages/devices";
import ProtectedRoute from "./ProtectedRoute";
import Project from "./pages/project";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/documentos-inspecao" element={<ProtectedRoute><Home /> </ProtectedRoute>} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
        <Route path="/projetos/:projectId" element={<Project />}
        />
        <Route path="/dispositivos-cadastrados" element={<ProtectedRoute><Devices /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}