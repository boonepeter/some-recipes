import express from 'express';
import recipeService from '../services/recipeServices';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(recipeService.getRecipes());
});

router.post('/', (req, res) => {
    res.send(recipeService.addRecipe(req.body));
});

router.get('/:id', (req, res) => {
    const recipe = recipeService.findRecipe(req.params.id);
    if (!recipe) {
      res.status(404).json({ error: 'patient not found' });
    }
    res.json(recipe);
});

export default router;