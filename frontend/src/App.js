import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PacientesPage from './pages/PacientesPage';
import EspecialidadesPage from './pages/EspecialidadesPage';
import CitasPage from './pages/CitasPage';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
        <Route path="/pacientes" element={
          <PrivateRoute>
            <PacientesPage />
          </PrivateRoute>
        } />
        <Route path="/especialidades" element={
          <PrivateRoute>
            <EspecialidadesPage />
          </PrivateRoute>
        } />
        <Route path="/citas" element={
          <PrivateRoute>
            <CitasPage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;