import React, { useState } from 'react';
import { Form, Button, Col, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { apiBaseUrl, parseApiBaseUrl, supportedUrls } from '../constants';
import { Recipe, User } from '../types'
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
  loggedInUser: User | null | undefined;
  recipe?: Recipe;
}

const NewRecipeForm: React.FC<Props> = ({handleClose, loggedInUser, recipe}: Props) => {
  console.log(recipe)
  const history = useHistory();
  const [title, setTitle] = useState(recipe?.title ? recipe.title : '');
  const [description, setDescription] = useState(recipe?.description ? recipe.description : '');
  const [link, setLink] = useState(recipe?.link);

  const newItem = (value: string): Item => {
    return { value: value, id: uuid() }
  }
  const [ingredients, setIngredients] = useState<Item[]>(
    recipe ? 
    recipe.ingredients.map(i => newItem(i))
    : []
  );
  const [directions, setDirections] = useState<Item[]>(
    recipe ? 
    recipe.directions.map(i => newItem(i))
    : []
  );
  const [notes, setNotes] = useState<Item[]>(
    recipe?.notes ? 
    recipe.notes.map(i => newItem(i))
    : []
  );
  const [tags, setTags] = useState<Item[]>(
    recipe ? 
    recipe.tags.map(i => newItem(i))
    : []
  );

  const [isImporting, setIsImporting] = useState(false);
  const [hostName, setHostname] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [image, setImage] = useState(recipe?.imageURL);



  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    if (e.target.value === "") {
      setHostname('');
      setIsSupported(true);
      return;
    }
    try {
      const host = new URL(e.target.value).hostname;
      setHostname(host);
      if (supportedUrls.find(u => u === host || 'www.' + u === host) !== undefined) {
        setIsSupported(true)
      } else {
        setIsSupported(false);
      }
    } catch {
      setHostname('');
      setIsSupported(false);
      return;
    }
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
      setTags(splitTitle.map((t: string) => newItem(t)));
      setImage(recipe.data.image);
    }
    setIsImporting(false);
  }

  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    const newRec: NewRecipe = {
        ingredients: ingredients.flatMap(i => i.value === "" ? [] : i.value),
        title: title,
        description: description,
        reviews: [],
        directions: directions.flatMap(d => d.value === "" ? [] : d.value),
        tags: tags.flatMap(t => t.value === "" ? [] : t.value),
        notes: notes.flatMap(n => n.value === "" ? [] : n.value),
        link: link,
        user: loggedInUser ? loggedInUser : undefined,
        imageURL: image === "" ? undefined : image
      }
      event.preventDefault();
      event.stopPropagation();
      // TODO: add toast notification
      if (recipe) {
        console.log(loggedInUser);
        const response = await axios.put(`${apiBaseUrl}/recipes/${recipe.id}`, {
          recipe: newRec,
          token: loggedInUser?.token
        });
        if (response.data) {
          history.push('/')
          history.push(`/recipes/${response.data.id}`);
        }
      } else {
        const response = await axios.post(`${apiBaseUrl}/recipes`, newRec);
        if (response.status === 200) {
          if (response.data) {
            history.push(`/recipes/${response.data.id}`);
          }
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
                onChange={handleLinkChange}
                />
            </Col>
            <Col xs={3}>
              <Button disabled={ link === "" || !isSupported } onClick={handleImport}>
                {
                  isImporting ?
                  <Spinner animation="border"/>
                  : "Import"
                }
              </Button>
            </Col>
          </Row>
          {
            isSupported || !hostName ?
              null :
              <Row>
                <Col>
                    <p>
                      Sorry, {hostName ? hostName : "that domain"} is not currently supported.{ ' ' }
                      <a href="https://github.com/boonepeter/some-recipes/issues" target="_blank" rel="noopener noreferrer">Suggest it here</a>
                    </p>
                </Col>
              </Row>
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea"
            rows={3}
            value={description}
            placeholder="Short description..."
            onChange={({ target }) => setDescription(target.value)}
            />
        </Form.Group>
        <DynamicInput title="Ingredients" required startNum={3} itemList={ingredients} setItemList={setIngredients}/>
        <DynamicInput title="Directions" large required startNum={3} itemList={directions} setItemList={setDirections}/>
        <DynamicInput title="Tags" required itemList={tags} setItemList={setTags}/>
        <DynamicInput title="Notes" itemList={notes} setItemList={setNotes}/>
        <div className="container" style={{ marginTop: "20px", marginBottom: "20px"}}>
          <Button type="submit" size="lg" block>
          {
            recipe ? 'Update' : 'Submit'
          }
          </Button>
        </div>
      </Form>
    )
}

export default NewRecipeForm;