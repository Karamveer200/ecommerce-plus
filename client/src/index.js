/* eslint-disable react/no-deprecated */
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './config/theme';
import { Auth0Provider } from '@auth0/auth0-react';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const root = createRoot(document.getElementById('root'));

root.render(
  <React.Fragment>
    <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH_O_DOMAIN}
        clientId={process.env.REACT_APP_AUTH_O_CLIENT_ID}
        authorizationParams={{
          redirect_uri: process.env.REACT_APP_REDIRECT_URI,
          audience: process.env.REACT_APP_AUTH_O_API_IDENTIFIER
        }}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);
