import express from 'express'
import { GroupService } from '../Services/GroupService'

const router = express.Router()
const groupService = new GroupService()

router.put('/update-group', groupService.update-group.bind(groupService))
router.delete('/delete-group', groupService.delete-group.bind(groupService))
router.get('/get-group', groupService.get-group.bind(groupService))
router.post('/create-group', groupService.create-group.bind(groupService))

module.exports = router
