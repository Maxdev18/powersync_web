import { Request, Response } from 'express';

/**
 * GroupService.ts
 */
export class GroupService {
    async update-group(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully edited group")
    }
    async delete-group(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully deleted group")
    }
 async get-group(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully found group")
    }
 async create-group(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully created group")
    }
} 
