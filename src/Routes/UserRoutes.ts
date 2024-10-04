import express from 'express'
import { UserService } from '../Services/UserService'

const router = express.Router()
const userService = new UserService()

router.post('/register-user', userService.registerUser.bind(userService))

module.exports = router