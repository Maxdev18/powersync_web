import express from 'express'
import { GroupService } from '../Services/GroupService'

const router = express.Router()
const groupService = new GroupService()

router.put('/update-group', groupService.updateGroup.bind(groupService))
router.delete('/delete-group', groupService.deleteGroup.bind(groupService))
router.get('/get-group', groupService.getGroup.bind(groupService))
router.get('/get-all-groups', groupService.getAllGroups.bind(groupService))
router.post('/create-group', groupService.createGroup.bind(groupService))

module.exports = router
