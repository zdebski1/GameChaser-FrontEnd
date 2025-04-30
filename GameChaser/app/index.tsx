import React from 'react';
import { ReactDOM } from 'react-dom/client'; // <-- correct import
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
