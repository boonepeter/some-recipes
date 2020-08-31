import express from 'express';
import { createBlob, saveProfilePicture } from "../services/pictureService";
import fs from "fs";
import multer from "multer";
import UserModel from '../models/UserSchema';
import { isAuthorized } from '../services/authentication';

const upload = multer();
const uploadRouter = express.Router();

uploadRouter.get('/', async (_req, response) => {
    const reply = await createBlob("recipe-container");
    const pic = fs.readFileSync("DSC_0303.jpg");
    saveProfilePicture("boonepeter", "recipe-container", pic);
    response.json({ "success" : true });
})

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
    
});

export default uploadRouter