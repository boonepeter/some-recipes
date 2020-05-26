import React from 'react';
import { Recipe } from '../types';
import { Link } from 'react-router-dom';

const Preview: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div>
        <Link to={`/recipes/${recipe.id}`} ><h2>{recipe.title}</h2></Link>
      
      <div>
        {recipe.description}
      </div>
    </div>
  )
}

export default Preview