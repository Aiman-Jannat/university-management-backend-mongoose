import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

export const handleDuplicateError = (err:any)=>{
    
    const match = err.message.match(/"([^"]*)"/);

    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];
  
        const errorSources: TErrorSources = [
          {
            path: '',
            message: `${extractedMessage} is already exists`,
          },
        ];
    

    const statusCode = 404;
    return{
        statusCode,
        message:'Validation error',
        errorSources
    }
}
export default handleDuplicateError;