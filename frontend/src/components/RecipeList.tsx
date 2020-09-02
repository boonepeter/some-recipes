import React from 'react';
import { CardColumns } from 'react-bootstrap';
import { Recipe } from '../types';
import Preview from './Preview'

const RecipeList: React.FC<{ recipes: Recipe[] | null }> = ({ recipes }) => {
  if (!recipes) {
      return (
          <div>
              <h3>loading...</h3>
          </div>
      )
  }
  return (
    <CardColumns style={{margin: "20px"}}>
        {recipes.map((r: Recipe) => (
            <Preview key={r.recipeId} recipe={r}/>
        ))}
    </CardColumns>
  )
}

export default RecipeList