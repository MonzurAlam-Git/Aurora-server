import mongoose from 'mongoose'
import { StudentModel } from './studentModel'
import AppError from '../../app/config/Errors/AppError'
import httpStatus from 'http-status'
import { UserModel } from '../users/usersModel'
import { TStudent } from './studentInterface'

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
  const result = await StudentModel.findOne({ id })
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

const updateStudentIntoDB = async (
  studentId: string,
  payload: Partial<TStudent>,
) => {
  //1. destructure property
  const { name, guardian, localGuardian, ...restProperties } = payload

  //2.initialize updatedData
  const updatedData: Record<string, unknown> = { ...restProperties }

  console.log('updatedData b4', updatedData)
  // 3. Check validation and set values

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      updatedData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      updatedData[`localGuardian.${key}`] = value
    }
  }

  console.log('updatedData after', updatedData)

  const result = await StudentModel.findOneAndUpdate(
    { id: studentId },
    updatedData,
    {
      new: true,
      runValidators: true,
    },
  )

  return result
}

//PH Code
// const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
//   const { name, guardian, localGuardian, ...remainingStudentData } = payload

//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingStudentData,
//   }

//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }

//   if (guardian && Object.keys(guardian).length) {
//     for (const [key, value] of Object.entries(guardian)) {
//       modifiedUpdatedData[`guardian.${key}`] = value
//     }
//   }

//   if (localGuardian && Object.keys(localGuardian).length) {
//     for (const [key, value] of Object.entries(localGuardian)) {
//       modifiedUpdatedData[`localGuardian.${key}`] = value
//     }
//   }

//   console.log(modifiedUpdatedData)

//   const result = await StudentModel.findOneAndUpdate(
//     { id },
//     modifiedUpdatedData,
//     {
//       new: true,
//       runValidators: true,
//     },
//   )
//   return result
// }
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
}
