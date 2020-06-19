import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      minlength: 3,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    passwordHash: {
      type: String,
      required: true 
    },
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RecipeList'
      }
    ],
  })
  
  userSchema.plugin(uniqueValidator)
  userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })


  const User = mongoose.model('User', userSchema)
  export default User