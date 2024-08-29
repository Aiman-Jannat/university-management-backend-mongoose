import express, { NextFunction, Request, Response, Router } from 'express'
import { UserControllers } from './user.controller'
import { AnyZodObject } from 'zod'
import studentValidationSchema from '../student/student.validation.joi'
import { createStudentValidationSchema } from '../student/student.validation.zod'
import validateRequest from '../../utils/reqValidate'
const router = Router()

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent
)

export const UserRoutes = router;
