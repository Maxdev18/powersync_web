import express from 'express'
import { VerificationService } from '../Services/VerificationService'

const router = express.Router()
const verificationService = new VerificationService()

router.get('/get-code', verificationService.getVerificationCode.bind(verificationService))
router.post('/verify-code', verificationService.verifyCode.bind(verificationService))

module.exports = router