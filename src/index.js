import React from 'react';
import ReactDOM from 'react-dom';
import { RecipeProvider } from './Components/RecipeContext';
import App from './Components/App';
import 'bootstrap/dist/css/bootstrap.min.css';



// Use createRoot instead of ReactDOM.render
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </React.StrictMode>
);
