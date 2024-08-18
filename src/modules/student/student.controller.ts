import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { StudentServices } from './student.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    const result = await StudentServices.createStudentIntoDB(studentData)

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
    console.log('student created successfully')
  } catch (err) {
    console.log(err)
  }
}

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

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  })
})

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
