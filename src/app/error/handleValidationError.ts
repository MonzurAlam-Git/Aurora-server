import mongoose from 'mongoose'
import { TerrorSource, TGenericErrorResponse } from '../interface/error'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400
  const errorSources: TerrorSource = Object.values(err.errors).map((value) => {
    return {
      path: value.path,
      message: value.message,
    }
  })
  return {
    statusCode,
    message: 'Mongoose',
    errorSources,
  }
}
export default handleValidationError
