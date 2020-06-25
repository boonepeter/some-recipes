import React from 'react';
import { Recipe } from '../types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Preview: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const trimmedText = (): string => {
    if (!recipe.description) {
      return "...";
    }
    if (recipe.description.length > 250) {
      return recipe.description.substr(0, 250) + "...";
    }
    return recipe.description;
  }


  return (
    <Card style={{ minHeight: "150px"}}>
      <Card.Body>
        <Card.Title>
          <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
        </Card.Title>
        <Card.Text>{trimmedText()}</Card.Text>
        <Button href={`/recipes/${recipe.id}`}>View</Button>
      </Card.Body>
    </Card>
  )
}

export default Preview