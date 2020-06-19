import React, { useState } from 'react';
import { CardColumns, Spinner } from 'react-bootstrap';
import { Recipe } from '../types';
import Preview from './Preview'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
const SearchView: React.FC = () => {
  const [ recipes, setRecipes ] = useState<Recipe[]>([]);
  const [ searching, setSearching ] = useState(true);
  const query = useQuery();

  React.useEffect(() => {
      const searchRecipes = async () => {

          const terms = query.getAll("terms")
          const queryType = query.getAll("type")
          if (!terms || !queryType) {
            return;
          } else {
              const recipes = await axios.get<Recipe[]>(`${apiBaseUrl}/search?type=${queryType}&terms=${terms}`)
              if (recipes) {
                  setRecipes(recipes.data);
              }
              setSearching(false);
          }
      }
      searchRecipes();
  }, [])

  if (searching === true) {
      return (
          <Spinner animation="border"/>
      )
  } 
  if (recipes.length === 0) {
      return (
          <div className="container">
            <h2>No recipes found. Try again?</h2>
            <div>searching {searching}</div>
            <Spinner animation="border" className="mr-auto ml-auto"/>
          </div>

      )
  }
  return (
    <CardColumns>
        {
            recipes.map((r: Recipe) => (
            <Preview key={r.id} recipe={r}/>
        ))}
    </CardColumns>
  )
}

export default SearchView