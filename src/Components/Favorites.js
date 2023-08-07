import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';

const RecipeDetails = ({ recipe, show, onHide, onRemove }) => {
  const [detailedRecipe, setDetailedRecipe] = useState(null);
  const [substitutions, setSubstitutions] = useState([]);

  useEffect(() => {
    // Fetch detailed recipe data using the Spoonacular API based on the selected recipe's ID
    const apiKey = 'c6f4441292d54eb0abbb2e42b810a904';
    const apiUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;

    axios.get(apiUrl)
      .then((response) => {
        setDetailedRecipe(response.data);
      })
      .catch((error) => {
        console.error('Error fetching detailed recipe:', error);
      });

    // For demonstration purposes, I'm just setting a dummy substitution data
    const dummySubstitutions = ['Substitution 1', 'Substitution 2', 'Substitution 3'];
    setSubstitutions(dummySubstitutions);
  }, [recipe]);

  const handleRemove = () => {
    // Call the onRemove function passed from the Favorites component
    onRemove(recipe.id);
    // Close the modal
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{detailedRecipe?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card.Img variant="top" src={detailedRecipe?.image} alt={detailedRecipe?.title} />
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
        <Button variant="danger" onClick={handleRemove}>
          Remove from Favorites
        </Button>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  useEffect(() => {
    // Fetch favorite recipes from local storage
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavorites(favoriteRecipes);
  }, []);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const handleCloseRecipeModal = () => {
    setShowRecipeModal(false);
  };

  const handleRemoveRecipe = (recipeId) => {
    // Remove the recipe with the given ID from favorites
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
    // Update the local storage with the updated favorites
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  const renderSocialMediaButtons = (recipe) => {
    const recipeUrl = `https://example.com/recipes/${recipe.id}`; // Replace with the actual URL of your recipe page

   
  return (
    <div className="mt-2">
      <div className="d-flex justify-content-between flex-wrap">
        <PinterestShareButton url={recipeUrl} media={recipe.image} description={recipe.title}>
          <Button variant="danger" className="mb-2 w-100">
            <i className="fab fa-pinterest me-2 "></i> Pinterest
          </Button>
        </PinterestShareButton>
        {/* <TwitterShareButton url={recipeUrl} title={recipe.title}>
          <Button variant="info" className="mb-2 w-100">
            <i className="fab fa-twitter me-2"></i> Twitter
          </Button>
        </TwitterShareButton> */}
        <FacebookShareButton url={recipeUrl} quote={`Check out this delicious recipe: ${recipe.title}`}>
          <Button variant="primary" className="mb-2 w-100">
            <i className="fab fa-facebook-f me-2"></i> Facebook
          </Button>
        </FacebookShareButton>
      </div>
    </div>
  );
};


  return (
    <Container style={{ paddingTop: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Your Favorite Recipes</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {favorites.map((recipe) => (
          <Col key={recipe.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => handleViewRecipe(recipe)}>
                    View Recipe
                  </Button>
                  <Button variant="danger" onClick={() => handleRemoveRecipe(recipe.id)}>
                    Remove
                  </Button>
                </div>
                {renderSocialMediaButtons(recipe)}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Render the RecipeDetails component as a modal when a recipe is selected */}
      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          show={showRecipeModal}
          onHide={handleCloseRecipeModal}
          onRemove={handleRemoveRecipe}
        />
      )}
    </Container>
  );
};

export default Favorites;
