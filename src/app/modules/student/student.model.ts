import { Schema, model, connect } from 'mongoose'
import { StudentMethod, StudentModel, TGuardian, TStudent } from './student.interface'
import { TLocalGuardian, TUserName } from '../student/student.interface'
import validator, { isAlpha } from 'validator'

import config from '../../../config';
import { Semester } from '../semester/semester.model';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
})

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

const studentSchema = new Schema<TStudent, StudentModel>({
 id:{
  type:String,
  required:true,
  unique:true
 },
  userId:{
    type:Schema.Types.ObjectId,
    required:[true, "user id must be required"],
    unique:true,
    ref:'User'
  },
 
  name: userNameSchema,
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: `The gender field can only be male or female not {VALUE}`,
    },
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique:true
  },
  contactNo: { type: String },
  emergencyContactNo: { type: String },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuradianSchema,
  profileImg: { type: String },
  admissionSemester:{
    type:Schema.Types.ObjectId,
    ref:'Semester'
  },
  admissionDepartment:{
    type:Schema.Types.ObjectId,
    ref:'Department'
  },
  isDeleted:{
    type:Boolean,
    default:false

  }
},
{
  toJSON:{
    virtuals:true,
  }
})

studentSchema.virtual('fullName').get(function(){
  return this.name.firstName + this.name.middleName + this.name.lastName;
})



//query middleware

studentSchema.pre('find',function(next){
this.find({isDeleted:{$ne:true}});
next();
})

studentSchema.pre('find',function(next){
this.findOne({isDeleted:{$ne:true}});
next();

})
// [ {$match: { isDeleted : {  $ne: : true}}}   ,{ '$match': { id: '123456' } } ]

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});




//creating a custom static method
studentSchema.statics.isUserExist = async function (id:string) {
  const existingUser  = await Student.findOne({id});
  return existingUser;
}

//creating a custom instance method

// studentSchema.methods.isUserExist = async function(id:string){
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
