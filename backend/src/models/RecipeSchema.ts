import mongoose, { Schema, model, Model, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { Recipe } from '../types';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  ingredients: [
    {
      type: String,
      required: true,
    }
  ],
  directions: [
    {
      type: String,
      required: true,
    }
  ],
  link: {
    type: String,
    required: false,
  },
  reviews: [
    {
       type: String,
       required: false
    }
  ],
  tags: [
    {
      type: String,
      required: false
    }
  ],
  notes: [
    {
      type: String,
      required: false
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  imageURL: {
    type: String,
    required: false
  },
  temperature: {
    type: String,
    required: false
  },
  totalMinutes: {
    type: Number,
    required: false
  },
  author: {
    type: String,
    required: false,
  },
  cookTime: {
    type: Number,
    required: false,
  },
  prepTime: {
    type: Number,
    required: false
  },
  totalTime: {
    type: Number,
    required: false
  },
  recipeCategory: [
    {
      type: String,
      required: false
    }
  ],
  recipeYield: {
    type: String,
    required: false
  },
  nutrition: {
    type: Map,
    of: String,
    required: false
  },
  preheat: {
    type: Number,
    required: false
  }
})



interface IRecipe extends Document, Recipe {

}

recipeSchema.plugin(uniqueValidator)
recipeSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      returnedObject.recipeId = returnedObject.id;
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


const RecipeModel: Model<IRecipe> = model<IRecipe>('Recipe', recipeSchema)

export default RecipeModel