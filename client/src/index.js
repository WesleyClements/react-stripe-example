import React from 'react';
import ReactDOM from 'react-dom';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import reportWebVitals from './reportWebVitals';

import App from './App';

import './index.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
