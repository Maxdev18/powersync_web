/* eslint-disable @typescript-eslint/no-require-imports */
import { createServer } from 'node:http'
import { Request, Response } from 'express'

// Require dependencies
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
//sign in with google
app.post("/api/v1/users/create-user-with-google", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successfully signed in with google")
})

//sign in
app.post("/api/v1/users/login", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successfully signed in")
})

/************ Device Services ************/
app.get("/api/v1/devices/get-device", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successfully found device")
})
// Create Device
app.post("/api/v1/devices/create-device", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successfully created device")
})

//edit device
app.put("/api/v1/devices/update-device", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successfully edited device")
})

//edit group
app.put("/api/v1/groups/update-group", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successfully edited group")
})

//delete group
app.delete("/api/v1/groups/delete-group", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successfully deleted group")
})

//delete device
app.delete("/api/v1/devices/delete-device", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successfully deleted device")
})
/************ Group Services ************/
app.get("/api/v1/groups/get-group", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successfully found group")
})

//create group
app.post("/api/v1/groups/create-group", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)
  res.end("Successfully created group") 
})
// Initialize the server
const server = createServer(app)

// Listen to server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});