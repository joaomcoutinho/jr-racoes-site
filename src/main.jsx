import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './styles/globals.css'

import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'

// Área do cliente
import ExamesLoginPage from './pages/exames/LoginPage.jsx'
import PetSelectPage from './pages/exames/PetSelectPage.jsx'
import ExamesListPage from './pages/exames/ExamesListPage.jsx'

// Área do admin
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import ClienteForm from './pages/admin/ClienteForm.jsx'
import ClienteDetail from './pages/admin/ClienteDetail.jsx'
import ExameUpload from './pages/admin/ExameUpload.jsx'
import PetExamesAdmin from './pages/admin/PetExamesAdmin.jsx'

// Guards
import RequireCliente from './pages/exames/RequireCliente.jsx'
import RequireAdmin from './pages/admin/RequireAdmin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Site principal */}
            <Route path="/" element={<App />} />

            {/* Área do cliente */}
            <Route path="/exames/login" element={<ExamesLoginPage />} />
            <Route path="/exames" element={<RequireCliente><PetSelectPage /></RequireCliente>} />
            <Route path="/exames/:petId" element={<RequireCliente><ExamesListPage /></RequireCliente>} />

            {/* Área do admin */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
            <Route path="/admin/clientes/novo" element={<RequireAdmin><ClienteForm /></RequireAdmin>} />
            <Route path="/admin/clientes/:id" element={<RequireAdmin><ClienteDetail /></RequireAdmin>} />
            <Route path="/admin/clientes/:id/pets/:petId" element={<RequireAdmin><PetExamesAdmin /></RequireAdmin>} />
            <Route path="/admin/clientes/:id/pets/:petId/exames/novo" element={<RequireAdmin><ExameUpload /></RequireAdmin>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
