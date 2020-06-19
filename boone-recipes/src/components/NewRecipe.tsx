import React, { useState } from 'react';
import NewRecipeForm from './NewRecipeForm';
import { Modal, Button } from 'react-bootstrap';

interface Props {
  handleClose: () => void;
  handleShow: () => void;
  show: boolean;
}

const NewRecipeModal: React.FC<Props> = ({ handleClose, handleShow, show }: Props) => {

    return (
        <Modal size="lg" centered show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>
              Add new recipe
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewRecipeForm />
            <div>new recipe form</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Add
            </Button>
          </Modal.Footer>
        </Modal>
    )
}

export default NewRecipeModal;