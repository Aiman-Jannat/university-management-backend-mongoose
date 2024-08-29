import { NextFunction, Request, Response } from 'express'
import { TErrorSources, TGenericErrorResponse } from '../interface/error'
import { ZodError, ZodIssue } from 'zod'
import config from '../../config'
import handleZodError from '../error/handleZodError'
import handleValidationError from '../error/handleValidationError'
import handleCastError from '../error/handleCastError'
import handleDuplicateError from '../error/handleDuplicateError'
import AppError from '../error/AppError'


export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
)=> {
  let statusCode = 500
  let message = err.message || 'Something went wrong'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

 

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    console.log(simplifiedError)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError.errorSources
  } 
  else if(err?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err)
    console.log(simplifiedError)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError.errorSources
  }else if(err?.name === 'CastError'){
    const simplifiedError = handleCastError(err)
    console.log(simplifiedError)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError.errorSources
  }
  else if(err?.code === 11000){
    const simplifiedError = handleDuplicateError(err)
    console.log(simplifiedError)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError.errorSources
  }
  else if(err instanceof AppError){
    
    statusCode = err.statusCode;
    message = err?.message
    errorSources = [
      {
        path:'',
        message:err?.message
      }
    ]
  }
  else if(err instanceof Error){
    
    message = err?.message
    errorSources = [
      {
        path:'',
        message:err?.message
      }
    ]
  }
return res.status(statusCode).json({
    statusCode,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}
