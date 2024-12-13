import { Request, Response } from 'express';
import Group from '../Schemas/GroupSchema';
import User from '../Schemas/UserSchema';

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

    async deleteGroup(req: Request, res: Response): Promise<void> {
        const {groupId } = req.query;  // Get the group ID from the request body
    
   
    
        res.setHeader('Content-Type', 'application/json');
        try {
            // Use _id for deletion (ensure _id is a valid ObjectId)
            const deletedGroup = await Group.findByIdAndDelete(groupId);
    
            if (deletedGroup) {
                // Successfully deleted the group
                res.status(200).json({ message: "Successfully deleted group", group: deletedGroup }).end();
            } else {
                // Group not found
                res.status(404).json({ message: "Group not found" }).end();
            }
        } catch (error) {
            console.log("Error deleting group:", error);
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

        async getAllGroups(req: Request, res: Response): Promise<void> {
            const data = req.query
            res.setHeader('Content-Type', 'application/json');
            try {
                const userDoc = await User.findOne({_id: data.userId})
                if(userDoc){
                    const groups = await Group.find({userID: data.userId});
                    res.status(200).json({ message: "Successfully retrieved group IDs", groups }).end();
                    return;
                }
                else{
                    res.status(404).json({ message: "Wasn't able to find user"}).end();
                    return;
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" }).end();
            }
        }
    
    
    async createGroup(req: Request, res: Response): Promise<void> {
        const group = req.body;
        console.log(group)
        res.setHeader('Content-Type', 'application/json');
    
        try {
            const existingGroup = await Group.findOne({ name: group.name });
            if (existingGroup) {
                res.status(409).json({ message: "Group name already exists" }).end();
                return;
            }
    
            const newGroup = await Group.create({ name: group.name, numberOfDevices: 0, userID: group.userID });
            res.status(201).json({ message: "Successfully created group", group: newGroup }).end();
        } catch (error) {
            console.error('Error during group creation:', error);
            res.status(500).json({ message: "Internal server error" }).end();
        }
    }
}
