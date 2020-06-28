import React from 'react';
import NewRecipeForm from './NewRecipeForm';
import { Modal } from 'react-bootstrap';
import { User } from '../types';

interface Props {
  handleClose: () => void;
  handleShow: () => void;
  show: boolean;
  loggedInUser: User | null | undefined;
}

const NewRecipeModal: React.FC<Props> = ({ handleClose, handleShow, show, loggedInUser }: Props) => {

    return (
        <Modal size="lg" centered show={show} animation={false} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>
              New Recipe
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewRecipeForm handleClose={handleClose} loggedInUser={loggedInUser} />
          </Modal.Body>
        </Modal>
    )
}

export default NewRecipeModal;