import Axios from 'axios'
import { Response } from '../Types/Response'
import { Devices } from '../Types/Devices'
import { Group } from '../Types/Group'

export class DeviceAPI {
    static async createDevice(device: Devices): Promise<Response> {
      return Axios.post('/api/v1/devices/create-device', device)
        .then(res => {
          return { message: res.data.message, data: res.data.data, isError: false }
        })
        .catch(err => {
          console.log(err)
          return { message: "Something went wrong", isError: true }
        })
    }

    static async updateDevice(device: Devices): Promise<Response> {
      console.log("New updated device: ", device)
      return Axios.put('/api/v1/devices/update-device', device)
        .then(res => {
          return { message: res.data.message, data: res.data.data, isError: false }
        })
        .catch(err => {
          console.log(err)
          return { message: "Something went wrong", isError: true }
        })
    }

    static async deleteDevice(device: Devices): Promise<Response> {
        console.log(device._id)
        return Axios.delete('/api/v1/devices/delete-device', {params: {deviceID:device._id}})
          .then(res => {
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
    static async getDevice(device: Devices): Promise<Response> {
        return Axios.get('/api/v1/devices/get-device')
          .then(res => {
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDevicesByGroupIds(groupIds: string[]): Promise<Response> {
        try {
          const res = await Axios.get('/api/v1/devices/get-devices-by-groupID', {
            params: { groups: groupIds }, // Passing the group IDs as query parameters
          });
      
          // Storing devices in localStorage
          localStorage.setItem("devices", JSON.stringify(res.data.devices));
      
          return {
            message: res.data.message,
            data: res.data.devices,
            isError: false,
          };
        } catch (err) {
          console.log(err);
          
          return {
            message: "Something went wrong",
            isError: true,
          };
        }
      }
      
    static async getDeviceLocation(device: Devices): Promise<Response> {
        return Axios.get('/api/v1/devices/get-device-location')
          .then(res => {
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDevicePowerLevel(device: Devices): Promise<Response> {
        return Axios.get('/api/v1/devices/get-device-powerlevel')
          .then(res => {
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDeviceEstimatedLife(device: Devices): Promise<Response> {
        return Axios.get('/api/v1/devices/get-device-estimated-life')
          .then(res => {
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDevicePowerConsumption(device: Devices): Promise<Response> {
        return Axios.get('/api/v1/devices/get-device-power-consumption')
          .then(res => {
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDeviceEstimatedCost(device: Devices): Promise<Response> {
        return Axios.get('/api/v1/devices/get-device-estimated-cost')
          .then(res => {
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getLowDevices(group: Group): Promise<Response> {//needs group
        return Axios.get('/api/v1/devices/get-low-devices')
          .then(res => {
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDeviceCycles(device: Devices): Promise<Response> {
        return Axios.get('/api/v1/devices/get-device-cycles')
          .then(res => {
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDeviceByGroup(group: Group): Promise<Response> {//needs group
        return Axios.get('/get-devices-by-groupID')
          .then(res => {
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDeviceByName(device: Devices): Promise<Response> {
        return Axios.get('/api/v1/devices/get-device-by-name', {params: {deviceid:device.name}})
          .then(res => {
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
}