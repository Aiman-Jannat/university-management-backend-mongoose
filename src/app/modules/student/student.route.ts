import express from 'express'
import { studentControllers } from './student.controller'

const router = express.Router()

router.get('/', studentControllers.getAllStudentsData)
router.get('/:id', studentControllers.getSingleStudentsData)
router.delete('/:id', studentControllers.deleteSingleStudent)
export const StudentRoutes = router
