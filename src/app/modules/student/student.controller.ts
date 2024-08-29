import { NextFunction, Request, RequestHandler, Response } from 'express'
import { studentServices } from './student.service'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../error/AppError'
import { User } from '../user/user.model'

const getAllStudentsData: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await studentServices.getAllStudentsDataFromDB(req.query)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    })
  }
)

const getSingleStudentsData: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params

    const result = await studentServices.getSingleStudentsDataFromDB(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  }
)
const deleteSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentDataFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});



export const studentControllers = {
  getAllStudentsData,
  getSingleStudentsData,
  deleteSingleStudent,
}
