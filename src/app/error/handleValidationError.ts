import mongoose, { CastError } from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (
    err:mongoose.Error.ValidationError)
    :TGenericErrorResponse=>{

    const errorSources:TErrorSources = Object.values(err.errors).map((val:mongoose.Error.ValidatorError|mongoose.Error.CastError)=>{
        return{
            path:val?.path,
            message:val?.message
        }
    })
    const statusCode = 404;
    return {
        statusCode,
        message:'Id Error',
        errorSources
    }
}
export default handleValidationError