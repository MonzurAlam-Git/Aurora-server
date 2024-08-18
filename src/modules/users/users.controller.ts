import { NextFunction, Request, Response } from 'express'
// import { userValidationSchema } from './users.validation'
import { UserServices } from './users.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body

    // Schema Validation using Zod
    // const zodParsedData = userValidationSchema.parse(user)

    const result = await UserServices.createStudentIntoDB(password, student)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error: any) {
    next(error)
  }
}

export const UserController = {
  createStudent,
}
