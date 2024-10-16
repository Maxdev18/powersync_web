import { Request, Response } from 'express';

/**
 * GroupService.ts
 */
export class GroupService {
    async updateGroup(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully edited group")
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
