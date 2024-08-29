import { Schema, model } from "mongoose";
import { TSemester } from "./semester.interface";
import { Months, SemesterCode, SemesterName } from "./semester.constant";

const SemesterSchema = new Schema<TSemester>({
    name:{
        type:String,
        required:true,
        enum:SemesterName
    },
    code:{
        type:String,
        required:true,
        enum:SemesterCode
    },
    year:{
        type:String,
        required:true,
    },
    startMonth:{
        type:String,
        required:true,
        enum:Months
    },
    endMonth:{
        type:String,
        required:true,
        enum:Months
    },




},
{
    timestamps:true
}
)

SemesterSchema.pre('save', async function (next){
  const isSemesterExists = await Semester.findOne({
    year:this.year,
    name:this.name,
  });
  if(isSemesterExists){
    throw new Error('Semester is already exists!');
  }
  next()
    
})

export const Semester = model<TSemester>('Semester', SemesterSchema)