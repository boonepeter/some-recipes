import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Recipe } from '../types'
import DynamicInput from './DynamicInput';

interface Item {
  value: string;
  id: string;
}

type NewRecipe = Omit<Recipe, 'id'>;

interface Props {
  handleClose: () => void;
}

const NewRecipeForm: React.FC<Props> = ({handleClose}: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const [ingredients, setIngredients] = useState<Item[]>([]);
  const [directions, setDirections] = useState<Item[]>([]);
  const [notes, setNotes] = useState<Item[]>([]);
  const [tags, setTags] = useState<Item[]>([]);
  

  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    const recipe: NewRecipe = {
        ingredients: ingredients.map(i => i.value),
        title: title,
        description: description,
        reviews: [],
        directions: directions.map(d => d.value),
        tags: tags.map(t => t.value),
        notes: notes.map(n => n.value),
        link: link
      }
      event.preventDefault();
      event.stopPropagation();
      // TODO: add toast notification
      await axios.post(`${apiBaseUrl}/recipes`, recipe)
      handleClose();
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text"
            required
            placeholder="Recipe title"
            onChange={({ target }) => setTitle(target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Link</Form.Label>
          <Form.Control type="text"
            required={false}
            placeholder="www.example.com"
            onChange={({ target }) => setLink(target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea"
            rows={3}
            required
            placeholder="Short description..."
            onChange={({ target }) => setDescription(target.value)}
            />
        </Form.Group>
        <DynamicInput title="Ingredients" startNum={3} itemList={ingredients} setItemList={setIngredients}/>
        <DynamicInput title="Directions" startNum={3} itemList={directions} setItemList={setDirections}/>
        <DynamicInput title="Tags" itemList={tags} setItemList={setTags}/>
        <DynamicInput title="Notes" itemList={notes} setItemList={setNotes}/>
        <div className="container" style={{ marginTop: "20px", marginBottom: "20px"}}>
          <Button type="submit" size="lg" block>Submit</Button>
        </div>
      </Form>
    )
}

export default NewRecipeForm;