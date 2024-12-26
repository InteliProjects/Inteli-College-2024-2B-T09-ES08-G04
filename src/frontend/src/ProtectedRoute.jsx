import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  // Enquanto os dados de autenticação estão carregando
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Se o usuário não estiver autenticado, redirecione para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  // Caso contrário, renderize o componente filho
  return children;
};
export default ProtectedRoute;