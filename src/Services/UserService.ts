import { Request, Response } from 'express';

/**
 * UserService.ts
 */
export class UserService {
    async registerUser(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully registered user")
    }
} 