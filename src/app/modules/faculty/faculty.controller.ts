import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { FacultyService } from "./faculty.service";

const createFaculty = catchAsync(async(req,res)=>{
    const result = await FacultyService.createFacultyIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Faculty created successfully',
        data:result
    })
    
    return result;
})

const getAllFaculties = catchAsync(async(req,res)=>{
    const result = await FacultyService.getAllFacultiesFromDB();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Faculties are retrieved successfully",
        data:result
    })

})

const getSingleFaculty = catchAsync(async(req,res)=>{
    const {facultyId} = req.params;
    const result = await FacultyService.getSingleFacultyFromDB(facultyId);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"faculty retrived successfully",
        data:result
    })
})

const updateFaculty = catchAsync(async(req,res)=>{
    const {facultyId}= req.params;
    const result = await FacultyService.updateFacultyIntoDB(facultyId, req.body);
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"faculty updated successfully",
        data:result
    })
})

export const FacultyControllers = {
    createFaculty,
    getAllFaculties,
    getSingleFaculty,
    updateFaculty
}


