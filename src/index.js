// developed by "Bechir Dridi"
// Portfolio: https://bechirdev.netlify.app
// twitter:   https://twitter.com/bechir7dridi
// linkedin:  https://linkedin.com/in/bechir-dev/
// github:    https://github.com/Bechir-Dridi
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import context
import { WorkoutsContextProvider } from './context/WorkoutContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


