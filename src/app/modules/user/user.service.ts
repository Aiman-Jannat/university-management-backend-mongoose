import mongoose from 'mongoose'
import config from '../../../config'
import { TSemester } from '../semester/semester.interface'
import { Semester } from '../semester/semester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { NewUser, TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import AppError from '../../error/AppError'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {}
  userData.role = 'student'
  userData.password = password || (config.default_pass as string)

  const semesterData = await Semester.findById(studentData.admissionSemester)

  const session = await mongoose.startSession()
 
  try {
    
    session.startTransaction();
///transaction 1
    userData.id = await generateStudentId(semesterData)
    const newUser = await User.create([userData],{session})
    if (newUser.length) {
      studentData.id = newUser[0].id //embedding id
      studentData.userId = newUser[0]._id //reference id
    }
    else{
      throw new AppError(httpStatus.BAD_REQUEST,'failed to create user')
    }
///transaction-2
      const newStudent = await Student.create([studentData],{session})
     
      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
      }
      await session.commitTransaction();
      await session.endSession();
      return newStudent
    
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
}

export const UserServices = {
  createStudentIntoDB,
}
