import React, { useState } from 'react';
import { Form, Button, Col, Row, Spinner, Image } from 'react-bootstrap';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Recipe, User, NewRecipe } from '../types'
import DynamicInput from './DynamicInput';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

interface Item {
  value: string;
  id: string;
}


interface Props {
  handleClose: () => void;
  loggedInUser: User | null | undefined;
  recipe?: Recipe;
  setRecipe?: React.Dispatch<React.SetStateAction<Recipe | null>>;
}

const NewRecipeForm: React.FC<Props> = ({handleClose, loggedInUser, recipe, setRecipe}: Props) => {
  const history = useHistory();
  const [title, setTitle] = useState(recipe?.title ? recipe.title : '');
  const [description, setDescription] = useState(recipe?.description ? recipe.description : '');
  const [link, setLink] = useState(recipe?.link ? recipe.link : '');
  const [totalTime, setTotalTime] = useState(recipe?.totalTime ? recipe.totalTime : 0);
  const [cookTime, setCookTime] = useState(recipe?.cookTime ? recipe.cookTime : 0);
  const [prepTime, setPrepTime] = useState(recipe?.prepTime ? recipe.prepTime : 0);
  const [preheat, setPreheat] = useState(recipe?.preheat ? recipe.preheat : 0);
  const [author, setAuthor] = useState(recipe?.author ? recipe.author : '');
  const [imageFile, setImageFile] = useState<File|undefined>(undefined);

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
    recipe?.tags ? 
    recipe.tags.map(i => newItem(i))
    : []
  );

  const [isImporting, setIsImporting] = useState(false);
  const [hostName, setHostname] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [image, setImage] = useState(recipe?.imageURL);



  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    if (e.target.value !== "") {
      setIsSupported(true);
      try {
        const host = new URL(e.target.value).hostname;
        setHostname(host);
        console.log(hostName);
      } catch {
        setHostname('');
        setIsSupported(false);
      }
    }
  }

  const handleImport = async () => {
    setIsImporting(true);
    const recipe = await axios.get(`${apiBaseUrl}/parse?url=${link}`);
    if (recipe.status === 200 && recipe.data) {
      setIngredients(
        recipe?.data?.recipeIngredient ? 
        recipe.data.recipeIngredient.map((i: string) => newItem(i))
        : []
      );
      setDirections(
        recipe?.data?.recipeInstructions ? 
        recipe.data.recipeInstructions?.map((i: string) => newItem(i))
        : []
      );
      setTitle(recipe.data.name ? recipe.data.name : '');
      setIsImporting(false);
      setTags(recipe?.data?.keywords ? 
        recipe.data.keywords?.map((t: string) => newItem(t))
        : []
        );
      setImage(recipe.data.image ? recipe.data.image : '');
      setCookTime(recipe.data.cookTime ? recipe.data.cookTime : 0);
      setTotalTime(recipe.data.totalTime ? recipe.data.totalTime : 0);
      setPrepTime(recipe.data.prepTime ? recipe.data.prepTime : 0);
      setAuthor(recipe.data.author ? recipe.data.author : '');
    }
    setIsImporting(false);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e.target.files.length !== 0) {
        setImage(e.target.files[0].name);
        setImageFile(e.target.files[0]);
        console.log(imageFile?.name);
    }
}

  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    let shallowUser = loggedInUser ? loggedInUser : undefined;
    if (shallowUser) {
      shallowUser.lists = [];
    }
    const newRec: NewRecipe = {
        ingredients: ingredients.flatMap(i => i.value === "" ? [] : i.value),
        title: title,
        description: description,
        reviews: [],
        directions: directions.flatMap(d => d.value === "" ? [] : d.value),
        tags: tags.flatMap(t => t.value === "" ? [] : t.value),
        notes: notes.flatMap(n => n.value === "" ? [] : n.value),
        link: link,
        userId: loggedInUser ? loggedInUser.userId : undefined,
        user: shallowUser,
        imageURL: image === "" ? undefined : image,
        author: author,
        prepTime: prepTime,
        cookTime: cookTime,
        totalTime: totalTime
      }
      event.preventDefault();
      event.stopPropagation();
      // TODO: add toast notification
      //let form = new FormData();
      //if (imageFile) {
      //  form.append("image", imageFile);
      //}
      if (recipe) {
        const response = await axios.put(`${apiBaseUrl}/recipes/${recipe.recipeId}`, {
          recipe: newRec
        }, {
          headers: {
            Authorization: "Bearer " + loggedInUser?.token
          }
        });
        if (response.data && setRecipe) {
          setRecipe(response.data);
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
          <Form.Label>Title *</Form.Label>
          <Form.Control type="text"
            required
            placeholder="Recipe title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text"
            value={author}
            required={false}
            onChange={({ target }) => setAuthor(target.value)}
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
        </Form.Group>
        <Form.Group >
          <Form.Label>Image</Form.Label>
          <Form.File disabled={true} id="recipePicture" onChange={handleImageChange}/>
          {
            image ? 
            <Image src={image} height="100px" style={{margin: "5px"}}/>
            : null
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea"
            rows={3}
            required={false}
            value={description}
            placeholder="Short description..."
            onChange={({ target }) => setDescription(target.value)}
            />
        </Form.Group>
        <DynamicInput title="Ingredients *" required startNum={3} itemList={ingredients} setItemList={setIngredients}/>
        <DynamicInput title="Directions *" large required startNum={3} itemList={directions} setItemList={setDirections}/>
        <DynamicInput title="Tags *" required itemList={tags} setItemList={setTags}/>
        <DynamicInput title="Notes" itemList={notes} setItemList={setNotes}/>
        <Form.Group>
          <Form.Label>Total Time (minutes)</Form.Label>
          <Form.Control type="number"
            value={totalTime}
            required={false}
            onChange={({ target }) => setTotalTime(+target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Prep Time (minutes)</Form.Label>
          <Form.Control type="number"
            value={prepTime}
            required={false}
            onChange={({ target }) => setPrepTime(+target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Cook Time (minutes)</Form.Label>
          <Form.Control type="number"
            value={cookTime}
            required={false}
            onChange={({ target }) => setCookTime(+target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Preheat Temp (°F)</Form.Label>
          <Form.Control type="number"
            value={preheat}
            required={false}
            onChange={({ target }) => setPreheat(+target.value)}
            />
        </Form.Group>


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