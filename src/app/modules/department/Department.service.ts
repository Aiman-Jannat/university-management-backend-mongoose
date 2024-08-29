import { TDepartment } from "./Department.interface";
import { Department } from "./Department.model";


const createDepartmentIntoDB = async(payload:TDepartment)=>{
    // const isDeptExist = await Department.findOne({name:payload.name})
    // if(isDeptExist){
    //     throw new Error("This department is already exist!");
    // }
    const result = await Department.create(payload);
    return result;
}

const getAllDepartmentsFromDB = async()=>{
    const result = await Department.find().populate('facultyId');
    return result;
}

const getSingleDepartmentFromDB = async(id:string)=>{
    const result = await Department.findById(id);
    return result;
}

const updateDepartmentIntoDB = async(id:string,payload:Partial<TFaculty>)=>{
    const result = await Department.findOneAndUpdate({_id:id},payload,{new:true})
return result;
}


export const DepartmentService = {
    createDepartmentIntoDB,
    getAllDepartmentsFromDB,
    getSingleDepartmentFromDB,
    updateDepartmentIntoDB
}