/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TerrorSource, TGenericErrorResponse } from '../app/interface/error'
import config from '../app/config'
import handleZodError from '../app/error/handleZodError'
import handleValidationError from '../app/error/handleValidationError'
import handleCastError from '../app/error/handleCastError'
import handleDuplicateError from '../app/error/handleDuplicateError'
import AppError from '../app/error/AppError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // By default Values of Error Handler
  let statusCode = 500
  let message = 'Something went wrong'
  let errorSource: TerrorSource = [
    {
      path: '',
      message: 'Something Went Wrong ',
    },
  ]

  if (err instanceof ZodError) {
    const error_Zod = handleZodError(err)
    statusCode = error_Zod.statusCode
    message = error_Zod.message
    errorSource = error_Zod.errorSources
  } else if (err.name === 'ValidationError') {
    const error_Validation = handleValidationError(err)
    statusCode = error_Validation.statusCode
    message = error_Validation.message
    errorSource = error_Validation.errorSources
  } else if (err.name === 'CastError') {
    const error_castError = handleCastError(err)
    statusCode = error_castError.statusCode
    message = error_castError.message
    errorSource = error_castError.errorSources
  } else if (err.code === 11000) {
    const error_duplication = handleDuplicateError(err)
    statusCode = error_duplication.statusCode
    message = error_duplication.message
    errorSource = error_duplication.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSource = [
      {
        path: '',
        message: err.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err?.message
    errorSource = [
      {
        path: '',
        message: err.message,
      },
    ]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : 'null',
  })
}

export default globalErrorHandler
