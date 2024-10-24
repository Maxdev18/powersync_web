import { Request, Response } from 'express';
import Device from '../Schemas/DeviceSchema';
import bcrypt from 'bcrypt'

export class DeviceService {
    async getDevice(req: Request, res: Response) {
        const data = req.body
        res.setHeader('Content-Type', 'application/json')

        try{
            //sees if device exists 
            const deviceDoc = await Device.findOne({name: data.name})

            if(deviceDoc){
                res.status(200).json({message: "Device " + data.name + " was found!"}).end()
            }
            else{
                res.status(404).json({message: "Device " + data.name + " was not found."}).end()
            }
        }
        catch(error) {
            console.log(error)
            res.status(500)
            res.json({ message: "Internal server error" }).end()
        }   
    }

    async createDevice(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully created device")
    }

    async updateDevice(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully edited device")
    }

    async deleteDevice(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully deleted device")
    }

    async getDeviceLocation(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successflly found device location")
    }

    async getDevicePowerLevel(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successflly found device power level")
    }

    async getDeviceEstimatedLife(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successflly found device estimated life")
    }

    async getDevicePowerConsumption(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successflly found device power consumption")
    }

    async getDeviceEstimatedCost(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successflly found device estimated cost")
    }

    async getLowDevices(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successflly found low devices")
    }

    async getDeviceCycles(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successflly found device cycles")
    }

    async getDevicesByGroupID(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successflly found groupID")
    }
}