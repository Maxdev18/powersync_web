import { Request, Response } from 'express';
import User from '../Schemas/UserSchema';
import bcrypt from 'bcrypt'

/**
 * UserService.ts
 */
export class UserService {
    async registerUser(req: Request, res: Response) {
        const data = req.body

        res.setHeader('Content-Type', 'application/json')

        try {
            // Check if account already exists
            const userDoc = await User.findOne({ email: data.email })
            
            if(userDoc) {
                res.status(409).json({ message: "User already exists" }).end()
            } else {
                // Encrypt password
                const encryptedPassword = await bcrypt.hash(data.password, bcrypt.genSaltSync(), null)

                const user = new User({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: encryptedPassword,
                    theme: data.theme
                })

                await user.save()

                res.status(200).json({ message: "Successfully added user to database" }).end()
            }
        } catch(error) {
            console.log(error)
            res.status(500)
            res.json({ message: "Internal server error" }).end()
        }   
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