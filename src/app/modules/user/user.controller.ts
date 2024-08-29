import Joi from 'joi'
import { UserServices } from './user.service'
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  
  const { body } = req.body
  const result = await UserServices.createStudentIntoDB(body.password, body.student)
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  })

})

export const UserControllers = {
  createStudent,
}
