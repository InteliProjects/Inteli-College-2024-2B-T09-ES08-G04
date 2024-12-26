import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes.jsx';
import './styles/reset.scss';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const domain = import.meta.env.VITE_ISSUER_BASE_URL;
const clientId = import.meta.env.VITE_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

if (!domain || !clientId) {
  console.error("⚠️ Certifique-se de configurar o Auth0 no arquivo .env");
}

// Função para salvar o token no sessionStorage após login
const onRedirectCallback = (appState) => {
  const accessToken = appState?.accessToken; // O token pode vir no appState
  if (accessToken) {
    sessionStorage.setItem('authToken', accessToken);
    console.log(accessToken);
  }
  window.history.replaceState({}, document.title, appState?.returnTo || window.location.pathname);
};

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + '/documentos-inspecao',
        audience: audience, 
      }}
      onRedirectCallback={onRedirectCallback} // Configura o callback para redirecionamento
    >
      <AppRoutes />
    </Auth0Provider>
  </React.StrictMode>
);

