import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const GroupSchema = new Schema({
    name: String,
    userID: String,
    numberOfDevices: Number
})

const Group = model('Group', GroupSchema)

export default Group
