import { Auth0Provider } from '@auth0/auth0-react';

import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import UserContextComponent from './context/UserContext';
import App from './App';
import { StateProvider } from './store/StateProvider';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.Fragment>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_O_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_O_CLIENT_ID}
      authorizationParams={{
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        audience: process.env.REACT_APP_AUTH_O_API_IDENTIFIER
      }}>
      <UserContextComponent>
        <StateProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </StateProvider>
      </UserContextComponent>
    </Auth0Provider>
  </React.Fragment>
);
