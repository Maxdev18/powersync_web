import express from 'express'
import { GroupService } from '../Services/GroupService'

const router = express.Router()
const groupService = new GroupService()

router.put('/update-group', groupService.update-group.bind(userService))
router.delete('/delete-group', groupService.delete-group.bind(userService))
router.get('/get-group', groupService.get-group.bind(userService))
router.post('/create-group', groupService.create-group.bind(userService))

module.exports = router
