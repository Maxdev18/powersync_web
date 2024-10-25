import { Request, Response } from 'express';
import Group from '../Schemas/GroupSchema
import bcrypt from 'bcrypt'
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
}
    async deleteGroup(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully deleted group")
    }
 async getGroup(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully found group")
    }
 async createGroup(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully created group")
    }
} 
