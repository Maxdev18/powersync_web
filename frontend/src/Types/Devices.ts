export type Devices = {
    name: string,
    type: string,
    serialNumber: string,
    condition: string,
    notes: string,
    groupName: string,
    groupID: string,
    cycles: number,
    batteryPercentage: number,
    wattage: number,
    estimatedLife: number,
    estimatedCost: number,
    location: {
        longitude: number,
        latitude: number
    }
}