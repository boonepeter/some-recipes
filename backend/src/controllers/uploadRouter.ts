import express from 'express';
import { saveProfilePicture, saveRecipePicture } from "../services/pictureService";
import fs from "fs";
import multer from "multer";
import UserModel from '../models/UserSchema';
import { isAuthorized } from '../services/authentication';
import RecipeModel from '../models/RecipeSchema';

const upload = multer();
const uploadRouter = express.Router();

uploadRouter.post('/profile/:username', upload.single("profile"), async (req, response) => {
    let user = await UserModel.findOne({ username: req.params.username });
    if (user) {
        if (isAuthorized(req, user._id)) {
            const file = req.file;
            const result =  await saveProfilePicture(req.params.username, "recipe-container", file.buffer);
            if (result) {
                user.profilePicUrl = result;
                const newUser = await UserModel.findByIdAndUpdate(user._id, user, { new: true }).populate("lists");
                response.json(newUser?.toJSON());
            }
        }
    }
});

uploadRouter.post('recipe/:id', async (req, response) => {
    let recipe = await RecipeModel.findById(req.params.id).populate("user");
    if (recipe && recipe?.user?.userId) {
        if (isAuthorized(req, recipe.user.userId)) {
            const file = req.file;
            const result = await saveRecipePicture(recipe._id, "recipe-container", file.buffer);
            if (result) {
                recipe.imageURL = result;
                const newRecipe = await RecipeModel.findByIdAndUpdate(recipe._id, recipe, {new: true}).populate("user");
                response.json(newRecipe?.toJSON());
            }

        }
    }
});

export default uploadRouter