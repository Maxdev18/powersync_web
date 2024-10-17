import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const DeviceSchema = new Schema({
    name: String,
    type: String,
    serialNumber: String,
    condition: String,
    notes: String,
    groupName: String,
    groupID: String,
    cycles: Number,
    batteryPercentage: Number,
    wattage: Number,
    estimatedLife: Number,
    estimatedCost: Number,
    location: {
        longitude: Number,
        latitude: Number
    }
})

const Device = model('Device', DeviceSchema)

export default Device