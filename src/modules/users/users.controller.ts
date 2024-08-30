import { UserServices } from './users.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { FacultyServices } from '../faculties/faculties.services'
import { Request, Response } from 'express'

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  const result = await UserServices.createStudentIntoDB(password, studentData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  })
})

const createFaculties = catchAsync(async (req: Request, res: Response) => {
  const { password, faculty } = req.body
  const result = await UserServices.createFacultiesIntoDB(password, faculty)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  })
})
export const UserController = {
  createStudent,
  createFaculties,
}
