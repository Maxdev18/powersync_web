import { Request, Response } from 'express';
import User from '../Schemas/UserSchema';

/**
 * UserService.ts
 */
export class UserService {
    async registerUser(req: Request, res: Response) {
        const user = new User({
            firstName: "Max",
            lastName: "Melnik",
            email: "mzm6958@psu.edu",
            password: "password123"
        })

        await user.save()
        
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully registered user")
    }

    async loginUser(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully signed in")
    }

    async loginGoogleUser(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully signed in with google")
    }

    async updateUser(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully edited user")
    }

    async deleteUser(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully deleted user")
    }

    async updatePassword(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully reset password")
    }
} 