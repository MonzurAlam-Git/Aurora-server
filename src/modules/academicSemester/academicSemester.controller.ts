import { Request, Response } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { AcademicSemesterServices } from './academicSemester.services'

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    })
  },
)

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterServices.getAllSemestersFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is retrieved successfully',
    data: result,
  })
})

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const payLoad = req.params.semesterId
  const result =
    await AcademicSemesterServices.getSingleAcademicSemester(payLoad)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is retrieved successfully',
    data: result,
  })
})

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const updatedDoc = req.body
  const { semesterId } = req.params
  const result = AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    updatedDoc,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is updated successfully',
    data: updatedDoc,
  })
})

export const academicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
}
