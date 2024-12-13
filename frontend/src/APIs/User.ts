import Axios from 'axios'
import { Response } from '../Types/Response'
import { User } from '../Types/User'

export class UserAPI {
  static async login(credentials: { email: string, password: string }): Promise<Response> {
    return Axios.post('/api/v1/users/login', credentials)
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data.user))
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
        localStorage.setItem("user", JSON.stringify(res.data.user._doc))
        localStorage.setItem("groups", JSON.stringify([]))
        return { message: res.data.message, data: res.data.data, isError: false }
      })
      .catch(err => {
        console.log(err)
        return { message: "Something went wrong", isError: true }
      })
  }

  static async updateUser(user: User): Promise<Response> {
    return Axios.put('/api/v1/users/update-user', user)
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data.user))
        return { message: res.data.message, data: res.data.data, isError: false }
      })
      .catch(err => {
        console.log(err)
        return { message: "Something went wrong", isError: true }
      })
  }

  static async updatePassword(id: string, newPassword: string): Promise<Response> {
    return Axios.put('/api/v1/users/update-password', { id, newPassword })
      .then(res => {
        return { message: res.data.message, data: res.data, isError: false }
      })
      .catch(err => {
        console.log(err)
        return { message: "Something went wrong", isError: true }
      })
  }

  static async deleteUser(id: string): Promise<Response> {
    return Axios.delete('/api/v1/users/delete-user', { params: { id } })
      .then(res => {
        return { message: res.data.message, data: res.data.data, isError: false }
      })
      .catch(err => {
        console.log(err)
        return { message: "Something went wrong", isError: true }
      })
  }

  static logoutUser() {
    localStorage.clear()

    window.location.href = "http://localhost:3000"
  }
}