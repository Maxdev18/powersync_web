import { createServer } from 'node:http'
import { Request, Response } from 'express'

// Require dependecies
const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')

// Configuration for dotenv
dotenv.config()

// Server configurations
const hostname: string = '127.0.0.1'
const port: number = parseInt(process.env.PORT as string) || 8080;

// Dependency middleware
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(express.json())

// API Routes to services
app.get("/", (req: Request, res: Response) => {
  console.log("Request method is: ", req.method)
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)

  return res.end("This is the backend server")
})

/************ User Services ************/
// This code will be used later on to separate the
// services and routes into their own file. This is only
// some sample code to get started later.
// const userRoutes = require("./Routes/UserRoutes")
// app.use("/api/v1/users", userRoutes)

app.post("/api/v1/users/register-user", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successfully registered user")
})

/************ Device Services ************/
app.get("/api/v1/devices/get-device", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successflly found device")
})

/************ Group Services ************/
app.get("/api/v1/groups/get-group", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successflly found group")
})

// Initialize the server
const server = createServer(app)

// Listen to server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});