import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TecnicosPage from './pages/tecnicoPage';
import ClientesPage from './pages/clientePage';
import TicketsPage from './pages/ticketsPage';

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
            <TecnicosPage />
          </PrivateRoute>
        } />
        <Route path="/clientes" element={
          <PrivateRoute>
            <ClientesPage />
          </PrivateRoute>
        } />
        <Route path="/tickets" element={
          <PrivateRoute>
            <TicketsPage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;