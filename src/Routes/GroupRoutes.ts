import express from 'express'
import { GroupService } from '../Services/GroupService'

const router = express.Router()
const groupService = new GroupService()

router.put('/updateGroup', groupService.updateGroup.bind(groupService))
router.delete('/deleteGroup', groupService.deleteGroup.bind(groupService))
router.get('/getGroup', groupService.getGroup.bind(groupService))
router.post('/createGroup', groupService.createGroup.bind(groupService))

module.exports = router
