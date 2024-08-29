import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { DepartmentService } from "./Department.service";
import { sendResponse } from "../../utils/sendResponse";


const createDepartment = catchAsync(async(req,res)=>{
    const result = await DepartmentService.createDepartmentIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Department created successfully',
        data:result
    })
    
    return result;
})

const getAllDepartments = catchAsync(async(req,res)=>{
    const result = await DepartmentService.getAllDepartmentsFromDB();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Departments are retrieved successfully",
        data:result
    })

})

const getSingleDepartment = catchAsync(async(req,res)=>{
    const {departmentId} = req.params;
    const result = await DepartmentService.getSingleDepartmentFromDB(departmentId);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Department is retrieved successfully",
        data:result
    })
})

const updateDepartment = catchAsync(async(req,res)=>{
    const {departmentId}= req.params;
    const result = await DepartmentService.updateDepartmentIntoDB(departmentId, req.body);
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Department updated successfully",
        data:result
    })
})

export const DepartmentControllers = {
    createDepartment,
    getAllDepartments,
    getSingleDepartment,
    updateDepartment

}


