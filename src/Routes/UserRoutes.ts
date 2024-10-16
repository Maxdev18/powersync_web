import express from 'express'
import { UserService } from '../Services/UserService'

const router = express.Router()
const userService = new UserService()

router.post('/register-user', userService.registerUser.bind(userService))
router.post('/create-user-with-google', userService.loginGoogleUser.bind(userService))
router.post('/login', userService.loginUser.bind(userService))
router.put('/update-user', userService.updateUser.bind(userService))
router.put('/update-password', userService.updatePassword.bind(userService))
router.delete('/delete-user', userService.deleteUser.bind(userService))

module.exports = router