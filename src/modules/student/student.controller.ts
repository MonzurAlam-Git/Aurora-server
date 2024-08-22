import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { StudentServices } from './student.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params
  const result = await StudentServices.getSingleStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  })
})

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params
  const result = await StudentServices.deleteStudentFromDB(studentId)
  console.log(studentId, result)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
