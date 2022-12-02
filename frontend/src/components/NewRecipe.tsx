import React from 'react';
import NewRecipeForm from './NewRecipeForm';
import { Modal } from 'react-bootstrap';
import { User, Recipe } from '../types';

interface Props {
  handleClose: () => void;
  handleShow: () => void;
  show: boolean;
  loggedInUser: User | null | undefined;
  recipe?: Recipe;
  setRecipe?: React.Dispatch<React.SetStateAction<Recipe | null>>;
}

const NewRecipeModal: React.FC<Props> = ({ handleClose, handleShow, show, loggedInUser, recipe, setRecipe}: Props) => {
    return (
        <Modal size="lg" centered show={show} animation={false} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>
              {
                recipe ?
                recipe.title
                : "New Recipe"
              }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewRecipeForm handleClose={handleClose} loggedInUser={loggedInUser} recipe={recipe} setRecipe={setRecipe}/>
          </Modal.Body>
        </Modal>
    )
}

export default NewRecipeModal;