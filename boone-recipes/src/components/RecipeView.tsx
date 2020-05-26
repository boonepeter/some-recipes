import React from 'react';
import { Recipe } from '../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

const RecipeView: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [recipe, setRecipe] = React.useState<Recipe | null>(null);
  
  React.useEffect(() => {
    const getRecipe = async () => {
      const response = await axios.get<Recipe>(`${apiBaseUrl}/recipes/${id}`);
      console.log("public url", process.env.PUBLIC_URL)
      if (response.data) {
        setRecipe(response.data)
      }
    };
    getRecipe();
  }, []);

  if (!recipe) {
    return null;
  }
  return (
    <div>
      <h2>{recipe.title}
      { recipe.link ? 
          <a target="_blank" title="open in new tab" style={{paddingLeft: '5px'}} rel="noopener noreferrer" href={recipe.link}>
            <svg className="bi bi-box-arrow-up-right"  width="1em" height="1em" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M1.5 13A1.5 1.5 0 003 14.5h8a1.5 1.5 0 001.5-1.5V9a.5.5 0 00-1 0v4a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V5a.5.5 0 01.5-.5h4a.5.5 0 000-1H3A1.5 1.5 0 001.5 5v8zm7-11a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2.5H9a.5.5 0 01-.5-.5z" clipRule="evenodd"/>
              <path fillRule="evenodd" d="M14.354 1.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clipRule="evenodd"/>
            </svg>
            </a>
        : null}
      
      </h2>

      <div>
        {recipe.description}
      </div>
      <h3>Ingredients</h3>
      <ul>
      <div>
          {recipe.ingredients.map((i: string) => <li key={i}>{i}</li>)}
      </div>
      </ul>
        <h3>Directions</h3>
      <ul>
      <div>
          {recipe.directions.map((i: string) => <li key={i}>{i}</li>)}
      </div>
      </ul>
    </div>
  )
}

export default RecipeView