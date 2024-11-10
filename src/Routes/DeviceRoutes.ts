import express from 'express'
import { DeviceService } from '../Services/DeviceService'

const router = express.Router()
const deviceService = new DeviceService()

router.get('/get-device', deviceService.getDevice.bind(deviceService))
router.get('/get-device-by-name', deviceService.getDeviceByName.bind(deviceService))
router.get('/get-device-location', deviceService.getDeviceLocation.bind(deviceService))
router.get('/get-device-powerlevel', deviceService.getDevicePowerLevel.bind(deviceService))
router.get('/get-device-estimated-life', deviceService.getDeviceEstimatedLife.bind(deviceService))
router.get('/get-device-power-consumption', deviceService.getDevicePowerConsumption.bind(deviceService))
router.get('/get-device-estimated-cost', deviceService.getDeviceEstimatedCost.bind(deviceService))
router.get('/get-low-devices', deviceService.getLowDevices.bind(deviceService))
router.get('/get-device-cycles', deviceService.getDeviceCycles.bind(deviceService))
router.get('/get-devices-by-groupID', deviceService.getDevicesByGroupID.bind(deviceService))
router.post('/create-device', deviceService.createDevice.bind(deviceService))
router.put('/update-device', deviceService.updateDevice.bind(deviceService))
router.delete('/delete-device', deviceService.deleteDevice.bind(deviceService))

module.exports = router