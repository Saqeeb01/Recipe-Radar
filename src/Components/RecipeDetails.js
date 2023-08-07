import React, { useState, useEffect } from "react";
import { Modal, Card, Button } from "react-bootstrap";
import axios from "axios";

const RecipeDetails = ({ recipe, show, onHide }) => {
  const [detailedRecipe, setDetailedRecipe] = useState(null);
  const [substitutions, setSubstitutions] = useState([]);

  useEffect(() => {
    if (recipe) {
      // Fetch detailed recipe data using the Spoonacular API based on the selected recipe's ID
      // Replace 'YOUR_SPOONACULAR_API_KEY' with your actual Spoonacular API key
      const apiKey = "c6f4441292d54eb0abbb2e42b810a904";
      const apiUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setDetailedRecipe(response.data);
        })
        .catch((error) => {
          console.error("Error fetching detailed recipe:", error);
        });

      // You can fetch and set substitutions for certain ingredients here if available
      // For demonstration purposes, I'm just setting a dummy substitution data
      const dummySubstitutions = [
        "Substitution 1",
        "Substitution 2",
        "Substitution 3",
      ];
      setSubstitutions(dummySubstitutions);
    }
  }, [recipe]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {detailedRecipe ? detailedRecipe.title : "Loading..."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card.Img
          variant="top"
          src={detailedRecipe?.image}
          alt={detailedRecipe?.title}
        />
        <h5>Ingredients:</h5>
        <ul>
          {detailedRecipe?.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
        <h5>Cooking Instructions:</h5>
        <p>{detailedRecipe?.instructions}</p>
        <h5>Substitutions:</h5>
        <ul>
          {substitutions.map((substitution, index) => (
            <li key={index}>{substitution}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeDetails;
