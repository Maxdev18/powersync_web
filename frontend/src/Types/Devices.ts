export type Devices = {
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
}