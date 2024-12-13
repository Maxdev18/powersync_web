// This function starts the device simulation and
// updates the database to simulate the devices
import { DeviceAPI } from "../APIs/Devices"
import { Devices } from "../Types/Devices"
import { Group } from "../Types/Group"
import { Response } from "../Types/Response"

// are being updated in real time.
export const startDeviceSimulation = (): void => {
  const interval = 10000

  setInterval(async () => {
    // 1. Call random generation function
    generateRandomDeviceData()
  }, interval)
}

async function generateRandomDeviceData(): Promise<void> {
  const groups: Group[] = JSON.parse(localStorage.getItem("groups") as string)
  const groupIDs: any = groups.map(group => group._id)
  const devices: Response = await DeviceAPI.getDevicesByGroupIds(groupIDs)
  const updatedDevices: Devices[] = []

  if(devices.data !== undefined) {
    for(let i = 0; i < devices.data.length; i++) {
      const device: Devices = devices.data[i]
      const randomBatteryPercentage = Math.ceil(Math.random() * 100)
  
      device.batteryPercentage = randomBatteryPercentage
      device.cycles = Math.ceil(Math.random() * 500)
      device.wattage = Number((Math.random() * 10).toFixed(2))
      device.estimatedCost = Number((device.wattage * .18).toFixed(2))
      device.estimatedLife = Number((Math.random() * 1000).toFixed(2))
  
      await DeviceAPI.updateDevice(device)
      updatedDevices.push(device)
    }
  
    if (groups.length < 1) {
      // alert("No groups exist");
    } else {
      const dbDevices = await DeviceAPI.getDevicesByGroupIds(groupIDs)
      localStorage.setItem("devices", JSON.stringify([...dbDevices.data]))
    }
  }
}