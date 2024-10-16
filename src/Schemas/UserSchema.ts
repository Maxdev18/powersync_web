import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const User = model('User', UserSchema);

export default User;