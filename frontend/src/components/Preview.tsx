import React from 'react';
import { Recipe } from '../types';
import { Link, useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Preview: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const history = useHistory();
  const trimmedText = (): string => {
    if (!recipe.description) {
      return "...";
    }
    if (recipe.description.length > 300) {
      return recipe.description.substr(0, 300) + "...";
    }
    return recipe.description;
  }

  const handleClick = () => {
    history.push(`/recipes/${recipe.id}`)
  }

  return (
    <Card style={{ minHeight: "150px"}} onClick={handleClick}>
      <Card.Body>
        <Card.Title>
          <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
        </Card.Title>
        {
          recipe.imageURL ? 
          <a href={`/recipes/${recipe.id}`}>
            <Card.Img src={recipe.imageURL} />
          </a>
          : <>
              <Card.Text>{trimmedText()}</Card.Text>
              <Button href={`/recipes/${recipe.id}`}>View</Button>            
            </>
        }
      </Card.Body>
    </Card>
  )
}

export default Preview