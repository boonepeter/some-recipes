import React, { useState } from 'react';
import { CardColumns, Spinner, Container } from 'react-bootstrap';
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
              setSearching(false);
              setRecipes([]);
          } else {
              const recipes = await axios.get<Recipe[]>(`${apiBaseUrl}/search?type=${queryType}&terms=${terms}`)
              if (recipes) {
                  setRecipes(recipes.data);
              }
              setSearching(false);
          }
      }
      searchRecipes();
      // eslint-disable-next-line
  }, [])

  if (searching === true) {
      return (
          <Container style={{ marginTop: "20px"}}>
              <Spinner animation="border" />
          </Container>
      )
  } 
  if (recipes.length === 0 && searching === false) {
      return (
          <div className="container" style={{ marginTop: "20px" }}>
            <h2>No recipes found. Try again?</h2>
          </div>

      )
  }
  return (
      <Container style={{ marginTop: "20px"}}>
        <CardColumns>
            {
                recipes.map((r: Recipe) => (
                <Preview key={r.id} recipe={r}/>
            ))}
        </CardColumns>
      </Container>
  )
}

export default SearchView