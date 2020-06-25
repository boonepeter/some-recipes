import React from 'react';
import NewRecipeForm from './NewRecipeForm';
import { Modal } from 'react-bootstrap';

interface Props {
  handleClose: () => void;
  handleShow: () => void;
  show: boolean;
}

const NewRecipeModal: React.FC<Props> = ({ handleClose, handleShow, show }: Props) => {

    return (
        <Modal size="lg" centered show={show} animation={false} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>
              New Recipe
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewRecipeForm handleClose={handleClose} />
          </Modal.Body>
        </Modal>
    )
}

export default NewRecipeModal;