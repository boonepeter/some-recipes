# some-recipes

[![build and deploy](https://github.com/boonepeter/some-recipes/actions/workflows/build_deploy_azure.yml/badge.svg)](https://github.com/boonepeter/some-recipes/actions/workflows/build_deploy_azure.yml)

This site is hosted [here on Azure's Web App Service](https://some-recipes.azurewebsites.net/recipes) and uses GitHub Actions to build and deploy.

## [Frontend](https://github.com/boonepeter/some-recipes/tree/master/frontend)

The frontend of this website uses React, written in Typescript.

It was initially bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

`react-bootstrap` and `fontawesome` icons were used for the theme.

To install and run locally:

```bash
git clone https://github.com/boonepeter/some-recipes
cd some-recipes/frontend
npm install
npm start
```

To build for production, run:

```bash
npm run build
```

Then copy build folder to the root directory of the backend.

## [Backend](https://github.com/boonepeter/some-recipes/tree/master/backend)

The backend for this site is written in Typescript and uses Express on Node.js. Data is stored in MongoDB.

The site is deployed on Azure's Web App Service [here](https://some-recipes.azurewebsites.net).

To run locally:

```bash
git clone https://github.com/boonepeter/some-recipes
cd some-recipes/backend
npm install
npm run dev
```

### API

#### `GET /api/recipes`

Gets all recipes. Recipe type is:

```ts
Recipe {
    title: string;
    description: string;
    id: string;
    ingredients: string[];
    directions: string[];
    link?: string;
    notes?: string[];
    reviews: string[];
    tags: string[];
}
```

#### `GET /api/recipes/:id`

Gets a specific recipe.

#### `POST /api/recipes`

Add a new recipe.

#### `GET /api/users`

Gets all users. Users have the type:

```ts
User {
    username: string;
    email: string;
    name: string;
    lists: RecipeList[];
}
```

#### `GET /api/users/:username`

Gets a specific user.

#### `POST /api/users`

Create a new user.

#### `GET /api/lists`

Gets all of the users recipe lists (like "Favorites")

Lists have the type:

```ts
RecipeList {
    name: string;
    recipes: Recipe[];
}
```

#### `GET /api/search?type=<type>&terms=<term>`

Searches for recipes. `<type>` can be `title` or `tag`. `<term>` is what is used to search.

#### `GET /api/lists/:id`

Gets a specific list.

#### `POST /api/lists`

Add new list

#### `PUT /api/lists/:id`

Adds a recipe to the specified list. Recipe is passed in body.

### Note on routing

The backend routes the APIs, and everything else gets passed to the frontend. Since I'm using React, all of the frontend must be passed through `index.html` because the frontend routing is virtual. That is done like this:

```ts
// send everything else to the frontend index
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
```
