import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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
  }
})

recipeSchema.plugin(uniqueValidator)
recipeSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })



const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe