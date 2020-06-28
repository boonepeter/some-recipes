import React, { useState } from 'react';
import { Recipe, User } from '../types';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Props {
  loggedInUser?: User|null|undefined;

}

const RecipeView: React.FC<Props> = ({ loggedInUser }: Props) => {
  const { id } = useParams<{id: string}>();
  const [recipe, setRecipe] = React.useState<Recipe | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  React.useEffect(() => {
    const getRecipe = async () => {
      const response = await axios.get<Recipe>(`${apiBaseUrl}/recipes/${id}`);
      if (response.data) {
        setRecipe(response.data)
        console.log('recipe', response.data)
        console.log('logged in', loggedInUser);
        if (response.data.user && loggedInUser?.id === response.data.user.id) {
          setCanEdit(true);
        }
      }
    };
    getRecipe();
    // eslint-disable-next-line
  }, [id]);

  React.useEffect(() => {
    if (recipe?.user && loggedInUser?.id === recipe.user.id) {
      setCanEdit(true);
    }
    // eslint-disable-next-line
  }, [loggedInUser])

  React.useEffect(() => {
    const favList = loggedInUser?.lists.find(l => l.title === "Favorites")
    if (favList) {
      if (favList.recipes.find(r => r.id === id)) {
        setIsSaved(true);
      }
    }
  }, [loggedInUser, id])

  const saveRecipe = async () => {
    const listId = loggedInUser?.lists.find(l => l.title === "Favorites");
    const response = await axios.put(`${apiBaseUrl}/lists/${listId?.id}`, { recipeId: recipe?.id });
    if (response.status === 200) {
      setIsSaved(true);
    }
  }

  if (!recipe) {
    return null;
  }

  return (
    <div style={{margin: "20px"}}>
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
          {
            loggedInUser ? 
              <Button variant="outline-success" title="Save to favorites" onClick={saveRecipe}>
                {
                  isSaved ?
                    <FontAwesomeIcon icon={faCheck}/>
                  : <FontAwesomeIcon icon={faHeart} />
                } 
              </Button>
              : null
          }
          {' '}
        { 
          canEdit ?
            <Button variant="outline-secondary" title="Edit recipe (not supported yet)" disabled>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          : null  
        }
      
      {
        recipe.tags ? 
        <div>
          Tags:
          { recipe.tags.map((t, index) =>
            <Badge className="ml-10" style={{margin: 5}} variant="light" key={t + index}>
              <Link to={`/search?type=tag&terms=${t}`}>{t}</Link>
            </Badge>)}
        </div>
        : null  
      }
      {
        recipe.user ? 
        <div>
          Added by: <a href={`/profile/${recipe.user.username}`}>{recipe.user.name}</a>
        </div>
        : null
      }
      <div>
          {recipe.description}
      </div>
      <br></br>
      {
        recipe.imageURL ?
        <div style={{ marginBottom: "20px"}}>
          <img src={recipe.imageURL} alt={recipe.title} style={{width: "100%", maxWidth: "500px", height: "auto" }}/>
        </div>
        : null
      }
      <h4>Ingredients</h4>
      <ul>
      <div>
          {recipe.ingredients.map((i, index) => <li key={i + index}>{i}</li>)}
      </div>
      </ul>
        <h4>Directions</h4>
      <ol>
      <div>
          {recipe.directions.map((d, index) => <li key={d + index}>{d}</li>)}
      </div>
      </ol>
      {
        recipe.notes && recipe.notes.length > 0 ?
        <div>
          <h4>Notes</h4>
          <ul>
            {
              recipe.notes.map((n: string) => <li key={n}>{n}</li>)
            }
          </ul>
        </div>
        : null
      }
    </div>
  )
}

export default RecipeView