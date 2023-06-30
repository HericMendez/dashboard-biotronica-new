import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Main from './Main';
import 'helpers/initFA';
import { AuthProvider } from 'react-auth-kit';
const container = document.getElementById('main');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Main>
        <App />
      </Main>
    </AuthProvider>
  </React.StrictMode>
);
