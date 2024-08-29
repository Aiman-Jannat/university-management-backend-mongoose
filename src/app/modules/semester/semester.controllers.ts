import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SemesterServices } from "./semester.service";

const createSemester = catchAsync(async(req,res)=>{
    const result = await SemesterServices.createSemesterIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic semester is created successfully',
        data:result
    })


})

const getAllSemesters = catchAsync(async(req, res)=>{
    const result = await SemesterServices.getAllSemestersFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semesters are retrieved successfully',
        data: result,
      });
})
const getSingleSemester = catchAsync(async(req, res)=>{
    const {semesterId} = req.params;
    const result = await SemesterServices.getSingleSemesterFromDB(semesterId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester is retrieved successfully',
        data: result,
      });
})
const updateSingleSemester = catchAsync(async(req, res)=>{
    const {semesterId} = req.params;
    const result = await SemesterServices.updateSingleSemesterIntoDB(semesterId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester is updated successfully',
        data: result,
      });
})

export const SemesterControllers = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSingleSemester

}