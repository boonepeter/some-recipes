import axios from "axios";
import express from "express";
import parseRecipe from "../utils/parseRecipe";

const router = express.Router();

router.get("/", async (request, response) => {
    if (request.query.url) {
        const url = request.query.url.toString();
        const page = await axios.get(url);
        console.log("Got page...");
        if (typeof page.data === 'string') {
            const recipe = parseRecipe(page.data);
            if (recipe) {
                response.json(recipe);
                return;
            }
        }
    }
    response.json({"Error": true})
})

export default router