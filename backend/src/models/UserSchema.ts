import uniqueValidator from 'mongoose-unique-validator';
import {Document, model, Model, Schema} from 'mongoose';
import { RecipeList } from "../types";

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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
      type: Schema.Types.ObjectId,
      ref: 'RecipeList'
    }
  ]
});

interface IUser extends Document {
  username: string;
  email: string,
  name: string,
  passwordHash: string;
  lists: RecipeList[];
}

UserSchema.plugin(uniqueValidator)
UserSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})


const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
export default UserModel;
