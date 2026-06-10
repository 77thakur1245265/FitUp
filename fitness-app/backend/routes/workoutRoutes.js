import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { postWorkout, getWorkout, editWorkout, deleteWorkout } from '../controllers/workoutController.js'


const router = express.Router()

router.post('/', authMiddleware, postWorkout)

router.get('/', authMiddleware,getWorkout)

router.patch('/:id', authMiddleware, editWorkout)

router.delete('/:id', authMiddleware, deleteWorkout)

export default router