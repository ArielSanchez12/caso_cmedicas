import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PacientesPage from './pages/tecnicoPage';
import EspecialidadesPage from './pages/clientePage';
import CitasPage from './pages/ticketsPage';

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
        <Route path="/tecnicos" element={
          <PrivateRoute>
            <PacientesPage />
          </PrivateRoute>
        } />
        <Route path="/clientes" element={
          <PrivateRoute>
            <EspecialidadesPage />
          </PrivateRoute>
        } />
        <Route path="/tickets" element={
          <PrivateRoute>
            <CitasPage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;