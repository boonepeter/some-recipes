import React, { useState } from 'react';
import { Form, Button, Col, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { apiBaseUrl, parseApiBaseUrl } from '../constants';
import { Recipe } from '../types'
import DynamicInput from './DynamicInput';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

interface Item {
  value: string;
  id: string;
}

type NewRecipe = Omit<Recipe, 'id'>;

interface Props {
  handleClose: () => void;
}

const NewRecipeForm: React.FC<Props> = ({handleClose}: Props) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const [ingredients, setIngredients] = useState<Item[]>([]);
  const [directions, setDirections] = useState<Item[]>([]);
  const [notes, setNotes] = useState<Item[]>([]);
  const [tags, setTags] = useState<Item[]>([]);

  const [isImporting, setIsImporting] = useState(false);

  const newItem = (value: string): Item => {
    return { value: value, id: uuid() }
  }

  const handleImport = async () => {
    setIsImporting(true);
    const recipe = await axios.get(`${parseApiBaseUrl}${link}`);
    if (recipe.status === 200 && recipe.data) {
      setIngredients(recipe.data.ingredients?.map((i: string) => newItem(i)))
      setDirections(recipe.data.directions?.map((i: string) => newItem(i)));
      setTitle(recipe.data.title);
      setNotes([
        newItem(`Total time: ${recipe.data.total_time}`),
        newItem(`Yields: ${recipe.data.yields}`)
      ])
      setIsImporting(false);
      const splitTitle = recipe.data.title.split(" ")
      setTags(splitTitle.map((t: string) => newItem(t)))
    }
    setIsImporting(false);
  }

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
      const response = await axios.post(`${apiBaseUrl}/recipes`, recipe);
      if (response.status === 200) {
        if (response.data) {
          history.push(`/recipes/${response.data.id}`);
        }
      }
      handleClose();
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text"
            required
            placeholder="Recipe title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Link</Form.Label>
          <Row>
            <Col>
              <Form.Control type="text"
                required={false}
                placeholder="www.example.com"
                value={link}
                onChange={({ target }) => setLink(target.value)}
                />
            </Col>
            <Col>
              <Button disabled={ link === "" } onClick={handleImport}>
                {
                  isImporting ?
                  <Spinner animation="border"/>
                  : "Import"
                }
              </Button>
            </Col>
          </Row>
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