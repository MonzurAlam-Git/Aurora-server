import { TerrorSource } from './../interface/error'
import mongoose from 'mongoose'
import { TerrorSource, TGenericErrorResponse } from '../interface/error'

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400
  const message = 'Cast Error'

  const errorSources: TerrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ]

  return {
    statusCode,
    message,
    errorSources,
  }
}

export default handleCastError
