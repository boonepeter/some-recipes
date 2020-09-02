import uniqueValidator from 'mongoose-unique-validator';
import {Document, model, Model, Schema} from 'mongoose';
import { User } from "../types";

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
  ],
  profilePicUrl: {
    type: String,
    required: false
  }
});

interface IUser extends Document, User {

}

UserSchema.plugin(uniqueValidator)
UserSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.userId = returnedObject.id;
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
export default UserModel;
