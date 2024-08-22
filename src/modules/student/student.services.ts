import mongoose from 'mongoose'
import { StudentModel } from './studentModel'
import AppError from '../../app/config/Errors/AppError'
import httpStatus from 'http-status'
import { UserModel } from '../users/usersModel'

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.aggregate([{ $match: { id } }])
  const result = await StudentModel.findById(id)
  return result
}

const deleteStudentFromDB = async (studentId: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      // throw new AppError(
      //   httpStatus.BAD_REQUEST,
      //   'Student Deletion isnt successful ',
      // )
      throw new Error('Student Deletion isnt successful')
    }

    const deletedUser = await UserModel.find(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'User Deletion isnt successful ',
      )
    }
    await session.commitTransaction()
    return deletedStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(404, 'Deletion process failed')
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
