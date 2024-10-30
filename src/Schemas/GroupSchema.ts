import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const GroupSchema = new Schema({
    name: String,
    userID: String,
    //how many devices are in it?
})

const Group = model('Group', GroupSchema)

export default Group