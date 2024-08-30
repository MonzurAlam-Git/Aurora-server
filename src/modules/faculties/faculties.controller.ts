import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { FacultyServices } from './faculties.services'
import { Request, Response } from 'express'

// const createFaculties = catchAsync(async (req: Request, res: Response) => {
//   const { faculty } = req.body
//   const result = await FacultyServices.createFaculty(faculty)

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculty is created successfully',
//     data: result,
//   })
// })

export const FacultyController = {}
