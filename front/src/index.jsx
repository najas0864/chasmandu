import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './views/app';

window.onerror = function (msg, url, line, col, error) {document.body.innerHTML += `<p>ERROR: ${msg} (${url}:${line}:${col})</p>`;};
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);