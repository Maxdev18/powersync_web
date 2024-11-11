import Axios from 'axios'
import { Response } from '../Types/Response'
import { User } from '../Types/User'

export class UserAPI {
  static async login(credentials: { email: string, password: string }): Promise<Response> {
    return Axios.post('/api/v1/users/login', credentials)
      .then(res => {
        console.log(res)
        return { message: res.data.message, data: res.data.data, isError: false }
      })
      .catch(err => {
        console.log(err.data)
        return { message: "", isError: true, data: {} }
      })
  }

  static async register(credentials: User): Promise<Response> {
    return Axios.post('/api/v1/users/register-user', credentials)
      .then(res => {
        console.log(res)
        return { message: res.data.message, data: res.data.data, isError: false }
      })
      .catch(err => {
        console.log(err.data)
        return err.data as Response
      })
  }

  static async updateUser(user: User): Promise<Response> {
    return Axios.put('/api/v1/users/update-user', user)
      .then(res => {
        console.log(res)
        return { message: res.data.message, data: res.data.data, isError: false }
      })
      .catch(err => {
        console.log(err.data)
        return err.data as Response
      })
  }

  static async updatePassword(user: User): Promise<Response> {
    return Axios.put('/api/v1/users/update-password', user)
      .then(res => {
        console.log(res)
        return { message: res.data.message, data: res.data.data, isError: false }
      })
      .catch(err => {
        console.log(err.data)
        return err.data as Response
      })
  }

  static async deleteUser(id: string): Promise<Response> {
    return Axios.delete('/api/v1/users/delete-user', { params: { id } })
      .then(res => {
        console.log(res)
        return { message: res.data.message, data: res.data.data, isError: false }
      })
      .catch(err => {
        console.log(err.data)
        return err.data as Response
      })
  }
}