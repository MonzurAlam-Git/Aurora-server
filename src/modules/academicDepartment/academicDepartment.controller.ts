import catchAsync from '../../utils/catchAsync'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { AcademicDepartmentServices } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is created successfully',
      data: result,
    })
  },
)

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is retrieved successfully',
      data: result,
    })
  },
)
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentServices.getAllAcademicDepartmentFromDB()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department is retrieved successfully',
      data: result,
    })
  },
)

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { updatedDoc } = req.body

    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentFromDB(
        id,
        updatedDoc,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department is updated successfully',
      data: result,
    })
  },
)

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getSingleAcademicDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
}
