import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import FriendsProvider from './context/friends-context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FriendsProvider>
      <App />
    </FriendsProvider>
  </StrictMode>,
);
