import express from 'express';
import logger from '../utils/logger';
import RecipeSchema from '../models/RecipeSchema';

const searchRouter = express.Router();

searchRouter.get('/', async (request, response) => {
    logger.info(request.query);
    let terms: string[] = []
    if (request.query.terms) {
        terms = request.query.terms.toString().split(' ');
    } else {
        response.status(404).json({ error: 'no specified terms'})
    }

    if (request.query.type) {
        switch (request.query.type.toString().toLowerCase()) {
            case "tag":
                logger.info('tag', request.query.terms);
                const recipes = await RecipeSchema.find({ tags: { "$in": terms } }).limit(50);
                if (!recipes) { response.json(null) }
                response.json(recipes);
                break;
            case "title":
                logger.info("title", request.query.terms);
                const titleMatch = await RecipeSchema.find({ "title": { "$regex": request.query.terms as string, "$options": "i"}}).limit(50);
                response.json(titleMatch);
                break;
            default:
                logger.info(request.query.terms);
        }
    }

    response.status(200).end();
})


export default searchRouter