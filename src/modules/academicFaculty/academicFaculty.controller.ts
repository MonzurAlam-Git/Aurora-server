import catchAsync from '../../utils/catchAsync'
import { Request, Response } from 'express'
import { AcademicFacultyServices } from './academicFaculty.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is created successfully',
      data: result,
    })
  },
)

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is retrieved successfully',
      data: result,
    })
  },
)
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is retrieved successfully',
      data: result,
    })
  },
)

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { updatedDoc } = req.body

    await AcademicFacultyServices.updateAcademicFacultyFromDB(id, updatedDoc)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is updated successfully',
      data: updatedDoc,
    })
  },
)

export const AcademicFacultyController = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
}
