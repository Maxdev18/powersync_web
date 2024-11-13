/* eslint-disable @typescript-eslint/no-require-imports */
import { createServer } from 'node:http'
import { Request, Response } from 'express'

// Require dependencies
const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const mongoose = require("mongoose");

// Configuration for dotenv
dotenv.config()
// Server configurations
const hostname: string = '127.0.0.1'
const port: number = parseInt(process.env.PORT as string) || 8080;
const uri = `mongodb+srv://maxpersonal1721:pemqdXgTCWhyGwVz@backenddb.df4xp.mongodb.net/powersync?retryWrites=true&w=majority&appName=BackendDB`;

// Dependency middleware
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(express.json())

// API Routes to services
app.get("/", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200)

  return res.end("This is the backend server")
})

/************ User Services ************/
// This code will be used later on to separate the
// services and routes into their own file. This is only
// some sample code to get started later.
const userRoutes = require("./Routes/UserRoutes")
app.use("/api/v1/users", userRoutes)

/************ Device Services ************/
const deviceRoutes = require("./Routes/DeviceRoutes")
app.use("/api/v1/devices", deviceRoutes)

/************ Group Services ************/
const groupRoutes = require("./Routes/GroupRoutes")
app.use("/api/v1/groups", groupRoutes)

/************ Verification Services ************/
const verificationRoutes = require("./Routes/VerificationRoutes")
app.use("/api/v1/verification", verificationRoutes)

// Initialize the server
const server = createServer(app)

mongoose.connect(uri)
  .then(() => {
    console.log("Connected to database")
  })
  .catch(error => {
    console.error("Unable to connect to database...")
    console.error(error)
  });

// Listen to server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
