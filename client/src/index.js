/* eslint-disable react/no-deprecated */
import { Auth0Provider } from '@auth0/auth0-react';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.render(
  <React.Fragment>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_O_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_O_CLIENT_ID}
      authorizationParams={{
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        audience: process.env.REACT_APP_AUTH_O_API_IDENTIFIER
      }}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.Fragment>,
  document.getElementById('root')
);
