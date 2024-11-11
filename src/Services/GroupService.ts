import { Request, Response } from 'express';
import Group from '../Schemas/GroupSchema';

/**
 * GroupService.ts
 */
export class GroupService {
    async updateGroup(req: Request, res: Response) {
        const data = req.body;
        res.setHeader('Content-Type', 'application/json');
        try {
            const groupDoc = await Group.findOneAndUpdate({ name: data.name }, { name: data.newName }, { new: true });
            if (groupDoc) {
                res.status(200).json({ message: "Successfully updated group", group: groupDoc }).end();
            } else {
                res.status(404).json({ message: "Group not found" }).end();
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }

    async deleteGroup(req: Request, res: Response) {
        const { name } = req.body; //Get the group name from the request body
        res.setHeader('Content-Type', 'application/json');
        try {
            const deletedGroup = await Group.findOneAndDelete({ name });
            if (deletedGroup) {
                res.status(200).json({ message: "Successfully deleted group", group: deletedGroup }).end();
            } else {
                res.status(404).json({ message: "Group not found" }).end();
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }

    async getGroup(req: Request, res: Response) {
        const { name } = req.body; //Getting the group name from the request body
        res.setHeader('Content-Type', 'application/json');
        try {
            const groupDoc = await Group.findOne({ name });
            if (groupDoc) {
                res.status(200).json({ message: "Successfully found group", group: groupDoc }).end();
            } else {
                res.status(404).json({ message: "Group not found" }).end();
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }

        async getAllGroupIDs(req: Request, res: Response): Promise<void> {
            res.setHeader('Content-Type', 'application/json');
            try {
                // Find all groups and select only the '_id' field
                const groups = await Group.find({}, '_id'); // The second argument tells Mongoose to only return the _id field
    
                if (groups.length === 0) {
                    res.status(404).json({ message: "No groups found" }).end();
                } else {
                    // Return the list of group IDs
                    res.status(200).json({ message: "Successfully retrieved group IDs", groupIDs: groups }).end();
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" }).end();
            }
        }
    
    
    async createGroup(req: Request, res: Response): Promise<void> {
        console.log('Received request to create a group'); 
        console.log('Request Body:', req.body); //Check the request body content
    
        const { name } = req.body;
        res.setHeader('Content-Type', 'application/json');
    
        try {
            const existingGroup = await Group.findOne({ name });
            if (existingGroup) {
                res.status(409).json({ message: "Group name already exists" }).end();
                return;
            }
    
            const newGroup = await Group.create({ name, numberOfDevices: 0 });
            res.status(201).json({ message: "Successfully created group", group: newGroup }).end();
        } catch (error) {
            console.error('Error during group creation:', error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }
}
