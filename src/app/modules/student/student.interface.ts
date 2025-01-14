import { Model, Types } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string;
  userId:Types.ObjectId;
  password:string;
  name: TUserName
  gender: 'male' | 'female'
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  admissionSemester:Types.ObjectId;
  admissionDepartment:Types.ObjectId;
  isDeleted:boolean
}
//**For creating static */

export interface StudentModel extends Model<TStudent>{
  isUserExist(id:string):Promise<TStudent | null>;
}





//**For creating instance */

// export type StudentMethod = {
//   isUserExist(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<
// TStudent, 
// {}, 
// StudentMethod
// >
