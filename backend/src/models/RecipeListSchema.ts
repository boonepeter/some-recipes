import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const recipeListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    recipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
})

recipeListSchema.plugin(uniqueValidator)
recipeListSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })



const RecipeList = mongoose.model('RecipeList', recipeListSchema);
export default RecipeList;