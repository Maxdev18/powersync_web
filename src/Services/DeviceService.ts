import { Request, Response } from 'express';

export class DeviceService {
    async getDevice(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully found device")
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