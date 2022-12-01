import React, { useState } from 'react';
import { Recipe, User } from '../types';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEdit, faTrashAlt, faClipboardCheck, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import NewRecipe from './NewRecipe';
// import parseIngredient from '../helper';

interface Props {
  loggedInUser?: User|null|undefined;
}

const RecipeView: React.FC<Props> = ({ loggedInUser }: Props) => {
  const history = useHistory();
  const { id } = useParams<{id: string}>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [wasCopied, setWasCopied ] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  React.useEffect(() => {
    const getRecipe = async () => {
      const response = await axios.get<Recipe>(`${apiBaseUrl}/recipes/${id}`);
      if (response.data) {
        setRecipe(response.data)
        if (response.data.user?.userId && loggedInUser?.userId === response.data.user.userId) {
          setCanEdit(true);
        }
      }
    };
    getRecipe();
  }, [id, loggedInUser]);

  React.useEffect(() => {
    const favList = loggedInUser?.lists.find(l => l.title === "Favorites")
    if (favList) {
      if (favList.recipes.find(r => r.recipeId === id)) {
        setIsSaved(true);
      }
    }
  }, [loggedInUser, id])

  const saveRecipe = async () => {
    let list = loggedInUser?.lists.find(l => l.title === "Favorites");
    if (isSaved && list?.recipes) {
      list.recipes = list?.recipes?.filter(r => r.recipeId !== recipe?.recipeId);
    }
    if (!isSaved && list?.recipes && recipe) {
      list.recipes = list.recipes.concat(recipe);
    }
    const response = await axios.put(`${apiBaseUrl}/lists/${list?.id}`, list);
    if (response.status === 200) {
      setIsSaved(!isSaved);
    }
  }

  const copyToClipboard = () => {
    if (recipe) {
      // let ings = recipe.ingredients.map(parseIngredient);
      navigator.clipboard.writeText(recipe.ingredients.join("\r\n"));
      setWasCopied(true);
    }
  }
  
  const deleteRecipe = async () => {
    const windowRes = window.confirm('Are you sure you want to delete this recipe?');
    if (windowRes) {
      const response = await axios.delete(`${apiBaseUrl}/recipes/${id}`, { headers: {Authorization: "Bearer " + loggedInUser?.token}});
      if (response.status === 200) {
        history.push('/');
      }
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
              <Button variant="outline-secondary" title="Save to favorites" onClick={saveRecipe}>
                {
                  isSaved ?
                    <FontAwesomeIcon icon={faHeart}/>
                    : <FontAwesomeIcon icon={farHeart} />
                } 
              </Button>
              : null
          }
          {' '}
        { 
          canEdit ?
          <>
            <Button variant="outline-secondary" title="Edit recipe" onClick={handleShow}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            { ' ' }
            <Button variant="outline-danger" title="Delete recipe" onClick={deleteRecipe}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </>
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

      <br></br>
      <p>
          {recipe.description}
      </p>
      <br></br>
      {
        recipe.imageURL ?
        <div style={{ marginBottom: "20px"}}>
          <img src={recipe.imageURL} alt={recipe.title} style={{width: "100%", maxWidth: "500px", height: "auto" }}/>
        </div>
        : null
      }

      <h4>
        Ingredients
        { ' ' }
        <Button variant="btn btn-light btn-sm" title={wasCopied ? "Copied!" : "Copy to clipboard"} onClick={copyToClipboard}>
          <FontAwesomeIcon icon={
            wasCopied ? faClipboardCheck : faClipboardList
          } />
        </Button>


      </h4>
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
      <NewRecipe show={showModal} 
        handleClose={handleClose} 
        handleShow={handleShow} 
        loggedInUser={loggedInUser}
        recipe={recipe} setRecipe={setRecipe}/>
    </div>
  )
}

export default RecipeView