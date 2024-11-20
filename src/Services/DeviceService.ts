import { Request, Response } from 'express';
import Device from '../Schemas/DeviceSchema';
import Groups from '../Schemas/GroupSchema';

export class DeviceService {
    async getDevice(req: Request, res: Response) {//gets device by ID and returns that is was found
        const data = req.body
        res.setHeader('Content-Type', 'application/json')

        try{
            //sees if device exists 
            const deviceDoc = await Device.findOne({_id: data.deviceID})

            if(deviceDoc){
                res.status(200).json({message: "Device " + data.deviceID + " was found!"}).end()
            }
            else{
                res.status(404).json({message: "Device " + data.deviceID + " was not found."}).end()
            }
        }
        catch(error) {
            console.log(error)
            res.status(500)
            res.json({ message: "Internal server error" }).end()
        }   
    }

    async getDeviceByName(req: Request, res: Response) {
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

    async createDevice(req: Request, res: Response) {//adds new device
        const data = req.body
        res.setHeader('Content-Type', 'application/json')
        
        try{
            const deviceDoc = await Device.findOne({name: data.name})

            //sees if device already is in the system
            if(deviceDoc){
                res.status(200).json({message: "Device " + data.name + " was already made"}).end()
            }
            //see if group is in the system
            const groupDoc = await Groups.findOne({ _id: data.groupID })
            if (!groupDoc) {
                res.status(404).json({ message: "Group with ID " + data.groupID + " doesn't exist." }).end()
            } 
            else{
                const device = new Device({
                    name: data.name,
                    type: data.type,
                    serialNumber: data.serialNumber,
                    condition: data.condition,
                    notes: data.notes,
                    groupName: data.groupName,
                    groupID: data.groupID,
                    cycles: data.cycles,
                    batteryPercentage: data.batteryPercentage,
                    wattage: data.wattage,
                    estimatedLife: data.estimatedLife,
                    estimatedCost: data.estimatedCost,
                    location: data.location
                })
                await device.save()
                groupDoc.numberOfDevices = (groupDoc.numberOfDevices ?? 0) + 1 
                await groupDoc.save()
                res.status(200).json({message: "Successfully added!"}).end()
            }
        }
        catch(error) {
            console.log(error)
            res.status(500)
            res.json({ message: "Internal server error" }).end()
        }   
    }

    async updateDevice(req: Request, res: Response) {
        const data = req.body
        res.setHeader('Content-Type', 'application/json')
        
        try{
            const deviceDoc = await Device.findOne({_id: data.deviceID})
            //sees if device already is in the system
            if(!deviceDoc){
                res.status(200).json({message: "Device " + data.deviceID + " doesn't exist"}).end()
            }
            else{
                    deviceDoc.name = data.name
                    deviceDoc.type = data.type
                    deviceDoc.serialNumber = data.serialNumber
                    deviceDoc.condition = data.condition
                    deviceDoc.notes = data.notes
                    deviceDoc.groupName = data.groupName
                    deviceDoc.groupID = data.groupID
                    deviceDoc.cycles = data.cycles
                    deviceDoc.batteryPercentage = data.batterPercentage
                    deviceDoc.wattage = data.wattage
                    deviceDoc.estimatedLife = data.estimatedLife
                    deviceDoc.estimatedCost = data.estimatedCost
                    deviceDoc.location = data.location
                await deviceDoc.save()

                res.status(200).json({message: "Successfully updated!"}).end()
            }
        }
        catch(error) {
            console.log(error)
            res.status(500)
            res.json({ message: "Internal server error" }).end()
        }   
    }

    async deleteDevice(req: Request, res: Response): Promise<void> {
        const data = req.body;
        res.setHeader('Content-Type', 'application/json');
        try {
            const deviceDoc = await Device.findOne({ _id: data.deviceID });
            if (!deviceDoc) {
                res.status(200).json({ message: "Device " + data.deviceID + " doesn't exist" }).end();
                return
            }
    
            const group = deviceDoc.groupID;
            const groupDoc = await Groups.findOne({ _id: group });
            if (!groupDoc) {
                res.status(404).json({ message: "Group not found" }).end();
                return
            }
    
            await Device.deleteOne({ _id: data.deviceID });
            res.status(200).json({ message: "Successfully deleted device " + data.deviceID }).end();
            
            groupDoc.numberOfDevices = (groupDoc.numberOfDevices ?? 0) - 1;
            await groupDoc.save();
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }

    async getDeviceLocation(req: Request, res: Response) {
        const data = req.body
        res.setHeader('Content-Type', 'application/json')
        try{
            const deviceDoc = await Device.findOne({_id: data.deviceID})
            if (!deviceDoc) {
                res.status(404).json({ message: "Device " + data.deviceID + " doesn't exist" }).end()
            } else {
                res.status(200).json({ location: deviceDoc.location }).end();
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }

    async getDevicePowerLevel(req: Request, res: Response) {
        const data = req.body
        res.setHeader('Content-Type', 'application/json')
        try{
            const deviceDoc = await Device.findOne({_id: data.deviceID})
            if (!deviceDoc) {
                res.status(404).json({ message: "Device " + data.deviceID + " doesn't exist" }).end()
            } else {
                res.status(200).json({ batteryPercentage: deviceDoc.batteryPercentage }).end();
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }

    async getDeviceEstimatedLife(req: Request, res: Response) {
        const data = req.body
        res.setHeader('Content-Type', 'application/json')
        try{
            const deviceDoc = await Device.findOne({_id: data.deviceID})
            if (!deviceDoc) {
                res.status(404).json({ message: "Device " + data.deviceID + " doesn't exist" }).end()
            } else {
                res.status(200).json({ estimatedLife: deviceDoc.estimatedLife }).end();
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }

    async getDevicePowerConsumption(req: Request, res: Response) {
        const data = req.body
        res.setHeader('Content-Type', 'application/json')
        try{
            const deviceDoc = await Device.findOne({_id: data.deviceID})
            if (!deviceDoc) {
                res.status(404).json({ message: "Device " + data.deviceID + " doesn't exist" }).end()
            } else {
                res.status(200).json({ wattage: deviceDoc.wattage }).end();
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }

    async getDeviceEstimatedCost(req: Request, res: Response) {
        const data = req.body
        res.setHeader('Content-Type', 'application/json')
        try{
            const deviceDoc = await Device.findOne({_id: data.deviceID})
            if (!deviceDoc) {
                res.status(404).json({ message: "Device " + data.deviceID + " doesn't exist" }).end()
            } else {
                res.status(200).json({ estimatedCost: deviceDoc.estimatedCost }).end();
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }

    async getLowDevices(req: Request, res: Response) {//something wrong
        const data = req.body
        res.setHeader('Content-Type', 'application/json')
        try{
            //see if group is in the system
            const groupDoc = await Groups.findOne({ _id: data.groupID })
            if (!groupDoc) {
                res.status(404).json({ message: "Group with ID " + data.groupID + " doesn't exist." }).end()
            } 
            const lowBatteryDevices = await Device.find({ batteryPercentage: { $lt: 50 } })
            if (lowBatteryDevices.length == 0) {
                res.status(404).json({ message: "No low devices" }).end()
            } else {
                res.status(200).json(lowBatteryDevices).end();
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }

    async getDeviceCycles(req: Request, res: Response) {
        const data = req.body
        res.setHeader('Content-Type', 'application/json')
        try{
            const deviceDoc = await Device.findOne({_id: data.deviceID})
            if (!deviceDoc) {
                res.status(404).json({ message: "Device " + data.deviceID + " doesn't exist" }).end()
            } else {
                res.status(200).json({ cycles: deviceDoc.cycles }).end();
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }

    async getDevicesByGroupID(req: Request, res: Response) {
        const data: any = req.query

        res.setHeader('Content-Type', 'application/json')
        try{
            const devices: any = []
            //see if group is in the system
            for(let i = 0; i < data.groups.length; i++) {
                const deviceDocs = await Device.find({ groupID: data.groups[i]._id })
                deviceDocs.map(device => {
                    devices.push(device)
                })
            }

            res.status(200).json({ message: "Retireved all devices from groups", devices })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }
}