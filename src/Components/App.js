import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeSearch from './RecipeSearch';
import RecipeDetails from './RecipeDetails'; 
import AppNavbar from './AppNavbar'
import Favorites from './Favorites'; 
const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
       
        <Route path="/" element={<RecipeSearch />} /> 
        <Route path="/recipe/:id" element={<RecipeDetails />} /> 
        <Route path="/favorites" element={<Favorites />} />
      </Routes> 
    </Router>
  );
};

export default App;
