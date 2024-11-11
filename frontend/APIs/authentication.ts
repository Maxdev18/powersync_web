import Axios from 'axios'
import { Credentials } from '../Types/Credentials'
import { Response } from '../Types/Response'
import { User } from '../Types/User'

export class AuthenticationAPI {
    static async login(credentials: Credentials): Promise<Response> {
        return Axios.post('/api/v1/users/login', credentials)
            .then(res => {
                console.log("Logged in successfully", res)
                return { message: "", isError: false, data: res.data }
            })
            .catch(error => {
                console.log("Unable to login:", error)
                return { message: "", isError: true, data: {} }
            })
    }

    static async register(user: User): Promise<Response> {
        return Axios.post('/api/v1/users/register-user', user)
            .then(res => {
                console.log("Registered user successfully")
                return { message: "Registered successfully", isError: false, data: res.data }
            })
            .catch(error => {
                console.log("Unable to register user:", error)
                return { message: "", isError: true, data: {} }
            })
    }

    static async updatePassword(): Promise<Response> {
        return Axios.post('/api/v1/users/update-password')
            .then(res => {
                return { message: "Updated password successfully", isError: false, data: res.data }
            })
            .catch(error => {
                console.log("Unable to register user:", error)
                return { message: "", isError: true, data: {} }
            })
    }

    static async getCode(): Promise<Response> {
        return Axios.get('/api/v1/users/get-code', {
            params: {
                
            }
        })
        .then(res => {
            return { message: "", isError: false, data: res.data }
        })
        .catch(error => {
            console.log("Unable to get verification code:", error)
            return { message: "", isError: true, data: {} }
        })
    }
}