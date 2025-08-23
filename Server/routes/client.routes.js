import express from 'express'
import { sendQuery } from '../controllers/client.controller.js'
const router = express.Router()
router.post('/sendQuery',sendQuery)
export default router