import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, InputGroup, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useRecipeContext } from './RecipeContext';
import '../App.css'; // Import the custom CSS file
import RecipeDetails from './RecipeDetails'; // Import the RecipeDetails component

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { recipes, setRecipes } = useRecipeContext();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    const apiKey = 'c6f4441292d54eb0abbb2e42b810a904';
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${apiKey}&number=10`;

    axios.get(apiUrl)
      .then((response) => {
        setRecipes(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const handleCloseRecipeModal = () => {
    setShowRecipeModal(false);
  };

  const addToFavorites = (recipe) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    favoriteRecipes.push(recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    setFavorites((prevFavorites) => [...prevFavorites, recipe]);

    alert('Recipe saved to favorites!');
  };

  return (
    <Container>
    <Row className="my-4">
      <Col xs={12} md={8} lg={6} className="mx-auto">
        <h1 className="text-center mb-4">Discover Amazing Recipes</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-4">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter recipe name"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="rounded-start"
              />
              <Button
                variant="primary"
                type="submit"
                className="rounded-end"
                style={{ minWidth: '100px' }}
              >
                Search
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Col>
    </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {loading ? (
          <Col className="text-center">
            <Spinner animation="border" role="status" />
            <p>Loading...</p>
          </Col>
        ) : (
          recipes.map((recipe) => (
            <Col key={recipe.id}>
              <Card className="result-card">
                <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>{recipe.instructions}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button variant="primary" onClick={() => handleViewRecipe(recipe)}>View Recipe</Button>
                    <Button
                      variant={favorites.includes(recipe) ? 'success' : 'outline-primary'}
                      className="ms-auto"
                      onClick={() => addToFavorites(recipe)}
                    >
                      {favorites.includes(recipe) ? 'Saved' : 'Add to Favorites'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Render the RecipeDetails modal */}
      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          show={showRecipeModal}
          onHide={handleCloseRecipeModal}
        />
      )}
    </Container>
  );
};

export default RecipeSearch;
