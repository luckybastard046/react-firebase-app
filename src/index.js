import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { Provider } from 'react-redux';
import { store } from './store/store';

import App from './App';

import './index.scss';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.Fragment>
    <Router>
      <AuthProvider>
        <CartProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </CartProvider>
      </AuthProvider>
    </Router>
  </React.Fragment>
);