import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  theme:  {type: String, default: 'light'}
});

const User = model('User', UserSchema);

export default User;