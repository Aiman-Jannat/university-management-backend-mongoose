import { Schema, model } from "mongoose";
import { TDepartment } from "./Department.interface";
import { Faculty } from "../faculty/faculty.model";
import httpStatus from "http-status";
import AppError from "../../error/AppError";

const departmentSchema = new Schema<TDepartment>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    facultyId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Faculty'
    }
},
{
    timestamps:true
})

departmentSchema.pre('save',async function(next){
    const isDeptExist = await Department.findOne({
        name:this.name
    })
    if(isDeptExist){
        throw new AppError(
            httpStatus.NOT_FOUND,
            'this department does not  exist'
        )
    }
    next();
})


departmentSchema.pre('findOneAndUpdate',async function(next){
    const query = this.getQuery();
    const isDeptExist = await Department.findOne(query);
    if(!isDeptExist){
        
        throw new AppError(
            httpStatus.NOT_FOUND,
            'this department is already exist'
        )
    }
    next();
}
)


export const Department = model<TDepartment>('Department',departmentSchema);

