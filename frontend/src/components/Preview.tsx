import React from 'react';
import { Recipe } from '../types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Preview: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const trimmedText = (): string => {
    if (!recipe.description) {
      return "...";
    }
    if (recipe.description.length > 300) {
      return recipe.description.substr(0, 300) + "...";
    }
    return recipe.description;
  }

  return (
    <Card style={{ minHeight: "150px"}} >
      <Card.Body>
        <Card.Title>
          <Link to={`/recipes/${recipe.recipeId}`}>{recipe.title}</Link>
        </Card.Title>
        {
          recipe.imageURL ? 
          <a href={`/recipes/${recipe.recipeId}`}>
            <Card.Img src={recipe.imageURL} />
          </a>
          : <>
              <Card.Text>{trimmedText()}</Card.Text>
              <Button href={`/recipes/${recipe.recipeId}`}>View</Button>            
            </>
        }
      </Card.Body>
    </Card>
  )
}

export default Preview