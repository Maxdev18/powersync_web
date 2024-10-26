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
        const data = req.body// retrieve data sent by client
        //to check if an account exist or not
        res.setHeader('Content-Type', 'application/json')
        try{
            const userDoc = await User.findOne({email: data.email}) //wait to check if email exists duhhh
            if(userDoc){
                const validPassword = await bcrypt.compare(data.password, userDoc.password)
                if(validPassword){ //password is gud
                    res.status(200).json({message: "Successfully signed in"}).end()
                } else{
                    res.status(401).json({message: "Invalid password"}).end()
                }
            } else{ //couldn't find user email
                res.status(404).json({message: "User not found"}).end()
            }
        }
            catch(error) {
                console.log(error)
                res.status(500)
                res.json({ message: "Internal server error" }).end()
            
        }
    }

    async loginGoogleUser(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200)
        res.end("Successfully signed in with google")
    }

    async updateUser(req: Request, res: Response) {
        
        const data = req.body // get user data
        res.setHeader('content-type', 'application/json')// use json to test for now 
        try{
            const userDoc = await User.findOne({email: data.email}) //check if email exists
            if(userDoc){ //if email exist, update user info
                userDoc.firstName = data.firstName
                userDoc.lastName = data.lastName
                userDoc.theme = data.theme
                //user might just update name, without changing email
                if(userDoc.email !== data.newEmail){// attempting to change email 
                    const checkEmail = await User.findOne({email: data.newEmail}) // check if email already in system
                    if(checkEmail){ // if email already in system
                        res.status(409).json({message: "Email already in use"}).end()
                    }else{
                        userDoc.email = data.newEmail
                    }
                }
                
                await userDoc.save()
                res.status(200).json({message: "successfully updated user"}).end()
            }else {
                res.status(404).json({message: "User not found"}).end()
            }
        } catch(error){
            console.log(error)
            res.status(500)
            res.json({ message: "Internal server error"}).end()
        }

    }

    async deleteUser(req: Request, res: Response) {
        // res.setHeader('Content-Type', 'text/plain')
        // res.status(200)
        // res.end("Successfully deleted user")
    }

    async updatePassword(req: Request, res: Response) {
        const data = req.body
        res.setHeader('content-type', 'application/json')// use json to test for now   
        
        try{
            const userDoc = await User.findOne({email: data.email}) //check if email exists
            if(userDoc){
                const newPassword = await bcrypt.hash(data.newPassword, bcrypt.genSaltSync(), null)
                userDoc.password = newPassword //update the password now
                await userDoc.save()// wait for user to save it
                res.status(200).json({message: "successfully updated password"}).end()
            } else {
                res.status(404).json({message: "User not found"}).end()
            }
        }catch(error){
            console.log(error)
            res.status(500)
            res.json({ message: "Internal server error"}).end()
        }
    }
} 