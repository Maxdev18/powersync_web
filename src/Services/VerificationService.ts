import { Request, Response } from 'express';
import Code from "../Schemas/CodeSchema"

var nodemailer = require('nodemailer');


/**
 * VerificationService.ts
 */
export class VerificationService {
  async getVerificationCode(req: Request, res: Response) {
    const { email } = req.query

    const values = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ""

    for(let i = 0; i < 6; i++) {
      code += values[Math.floor(Math.random() * 36)]
    }

    res.setHeader('Content-Type', 'application/json')

    try {
      const newCodeDoc = new Code({
        code: code
      })

      await newCodeDoc.save()

      const codeId = (await Code.findOne({ code: code }))?.id

      await this.sendCode(code, email as string)
      res.status(200).json({ message: "Sent verfication code", codeId: codeId }).end()
    } catch(error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error"}).end()
    }
  }

  async verifyCode(req: Request, res: Response) {
    const { codeId, code } = req.body

    res.setHeader('Content-Type', 'application/json')

    try {
      const codeDoc = await Code.findById(codeId)

      if(codeDoc) {
        if(codeDoc.code === code) {
          await Code.deleteOne({ _id: codeId })
          res.status(200).end()
        } else {
          console.log("Invalid verification code")
          res.status(500).json({ message: "Invalid verification code" }).end()
        }
      } else {
        console.log("Invalid code document id")
        res.status(500).json({ message: "Invalid code document id" }).end()
      }
    } catch(error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" }).end()
    }
  }

  async sendCode(code: string, email: string): Promise<any> {
    console.log(process.env.EMAIL_PASSWORD)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'maxpersonal1721@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });

    var mailOptions = {
      from: 'maxim.melnikwork@gmail.com',
      to: email,
      subject: 'PowerSync | Verification Code',
      text: "Your verification code is " + code
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}