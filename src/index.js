import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'tachyons';

import App from './App';
import { AuthProvider } from './Contexts/AuthContext';
import { StockProvider } from './Contexts/StockContext';
import { CartProvider } from './Contexts/CartContext';
import './index.css';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <StockProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </StockProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
