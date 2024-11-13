import Axios from 'axios'
import { Response } from '../Types/Response'

export class VerifcationAPI {
  static async getCode(email: string): Promise<Response> {
    return Axios.get("/api/v1/verification/get-code", {
      params: {
        email
      }
    })
    .then(res => {
      localStorage.setItem("codeId", res.data.codeId)
      return { message: "", isError: false, data: {} }
    })
    .catch(err => {
      console.log(err)
      return err.data as Response
    })
  }

  static async verifyCode(codeId: string, code: string): Promise<Response> {
    return Axios.post("/api/v1/verification/verify-code", { codeId, code })
      .then(res => {
        localStorage.removeItem("codeId")
        return { message: "", isError: false, data: {} }
      })
      .catch(err => {
        console.log(err.data)
        return err.data as Response
      })
  }
}