import React from 'react';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { Recipe } from '../types';
import RecipeView from './RecipeView'
import Preview from './Preview'
import { useParams } from 'react-router-dom';

const RecipeList: React.FC<{ recipes: Recipe[] | null }> = ({ recipes }) => {
  if (!recipes) {
      return (
          <div>
              <h3>loading...</h3>
          </div>
      )
  }
  return (
      <div>
        {recipes.map((r: Recipe) => (
            <Preview key={r.id} recipe={r}/>
        ))}
      </div>
  )
}

export default RecipeList