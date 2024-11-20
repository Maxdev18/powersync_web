import Axios from 'axios'
import { Response } from '../Types/Response'
import { Devices } from '../Types/Devices'

export class DeviceAPI {
    static async createDevice(device: Devices): Promise<Response> {
        return Axios.put('/api/v1/devices/create-device', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
    static async updateDevice(device: Devices): Promise<Response> {
        return Axios.put('/api/v1/devices/update-device', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
    static async deleteDevice(device: Devices): Promise<Response> {
        return Axios.put('/api/v1/devices/delete-device', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
    static async getDevice(device: Devices): Promise<Response> {
        return Axios.put('/api/v1/devices/get-device', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
    static async getDeviceLocation(device: Devices): Promise<Response> {
        return Axios.put('/api/v1/devices/get-device-location', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDevicePowerLevel(device: Devices): Promise<Response> {
        return Axios.put('/api/v1/devices/get-device-powerlevel', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDeviceEstimatedLife(device: Devices): Promise<Response> {
        return Axios.put('/api/v1/devices/get-device-estimated-life', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDevicePowerConsumption(device: Devices): Promise<Response> {
        return Axios.put('/api/v1/devices/get-device-power-consumption', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDeviceEstimatedCost(device: Devices): Promise<Response> {
        return Axios.put('/api/v1/devices/get-device-estimated-cost', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getLowDevices(device: Devices): Promise<Response> {//needs group
        return Axios.put('/api/v1/devices/get-low-devices', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDeviceCycles(device: Devices): Promise<Response> {
        return Axios.put('/api/v1/devices/get-device-cycles', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDeviceByGroup(device: Devices): Promise<Response> {//needs group
        return Axios.put('/get-devices-by-groupID', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
      static async getDeviceByName(device: Devices): Promise<Response> {
        return Axios.put('/api/v1/devices/get-device-by-name', device)
          .then(res => {
            console.log(res)
            return { message: res.data.message, data: res.data.data, isError: false }
          })
          .catch(err => {
            console.log(err)
            return { message: "Something went wrong", isError: true }
          })
      }
}