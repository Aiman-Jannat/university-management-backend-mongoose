import mongoose from 'mongoose';
import { TStudent } from './student.interface'
import { Student } from './student.model'
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { populate } from 'dotenv';
import QueryBuilder from '../../builder/Querybuilder';
import { studentSearchableFields } from './student.constant';


  // const result = await Student.create(studentData);//built in static method
  
  //** create interface

  // const student = new Student(studentData) 
  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('user already exists!')
  // }
  // const result = await student.save() // built in instance method
  // return result


const getAllStudentsDataFromDB = async (query:Record<string,unknown>) => {
  
  // let searchTerm = '';
  // if(query?.searchTerm){
  //   searchTerm = query?.searchTerm as string;
  // }
  // const queryObject = {...query};
  //{email:{$regex : query.searchTerm , $options : 'i'}}
  
  

  //Search Query
  // const searchQuery = Student.find({
  //   $or:['email','name.firstName','presentAddress'].map((field)=>({
  //     [field]:{$regex:searchTerm , $options:'i'}
  //   })
  // )
  // })

  //filtering functionality

  // const excludeFields = ['searchTerm','sort','limit','page','fields'];
  // excludeFields.forEach((el)=>delete queryObject[el])
  
  // const filterQuery = searchQuery
  // .find(queryObject)
  // .populate('admissionSemester')
  // .populate({
  //   path:'Department',
  //   populate:{
  //     path:'Faculty'
  //   }
  // })

  //Sorting

  // let sort = '-createdAt';
  // if(query.sort){
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  //pagination

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query.limit){
  //   limit = query.limit as number;
  // }
  // if(query.page){
  //   page  = Number(query.page);
  //   skip = (page-1)*limit;
  // }

  // const paginateQuery = sortQuery.skip(skip)

  //limit
  // const limitQuery = paginateQuery.limit(limit);
  // console.log(query)

//field limiting

// let fields = '-__v';
// if(query.fields){
//   fields = (query.fields as string).split(',').join(' ')
// }

// const fieldQuery = await limitQuery.select(fields)
 const studentQuery = new QueryBuilder(Student.find()
 .populate('admissionSemester'), query);
  studentQuery.search(studentSearchableFields);
  studentQuery.filter();
  studentQuery.sort();
  studentQuery.paginate();
  studentQuery.fields();
  const result = await studentQuery.modelQuery;
  return result;
}

const getSingleStudentsDataFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result;
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentDataFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};


export const studentServices = {
 
  getAllStudentsDataFromDB,
  getSingleStudentsDataFromDB,
  updateStudentIntoDB,
  deleteStudentDataFromDB
}
