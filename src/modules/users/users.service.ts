import { AcademicSemesterModel } from './../academicSemester/academicSemester.model'
import mongoose, { Mongoose } from 'mongoose'
import config from '../../app/config'
import AppError from '../../app/config/Errors/AppError'

import { TStudent } from '../student/studentInterface'
import { StudentModel } from '../student/studentModel'
import { generateStudentId } from './users.utils'
import { TUser } from './usersInterface'
import { UserModel } from './usersModel'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const session = await mongoose.startSession()
  // 1. Create Empty User Data:
  const userData: Partial<TUser> = {}

  // 2. User properties(password,role,id) Fill from Request.password or from config file , role:studnet , generate id using payload
  userData.password = password || (config.default_password as string)
  userData.role = 'student'

  /* Student ID(userData.id) creation - (Year-SemCode-Roll) */

  // admission semester catch to use the properties like Code,year
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  )
  // Check if the admissionSemester is null
  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admission semester not found') // Handle the null case
  }
  try {
    session.startTransaction()

    userData.id = await generateStudentId(admissionSemester)

    // 3. Create New User with filled user data
    const newUser = await UserModel.create([userData], { session })

    // 4. Embed User IDs in Student Data with  new User data
    if (newUser.length) {
      payload.id = newUser[0].id //embedded id
      payload.user = newUser[0]._id //reference id
    } else {
      throw new AppError(404, 'User not created')
    }

    // 5. create a new student based on filled new user data (StudentXUser)
    const newStudent = await StudentModel.create([payload], { session })

    if (newStudent.length) {
      await session.commitTransaction()
      await session.endSession()
      return newStudent
    } else {
      throw new AppError(404, 'Student Not Created')
    }
  } catch (error) {
    await session.abortTransaction()
  }
}

export const UserServices = {
  createStudentIntoDB,
}

// Mongoose BuiltIn static Method
// const productInstance = await ProductModel.create(product)

// Instance method
// const userInstance = new UserModel(user)

//   if (await productInstance.isUserExists(product.name)) {
//     throw new Error('User already Exists')
//   }

// export type NewUser = {
//   password: string
//   role: string
//   id: string
// }
// console.log('Student data =>', StudentData)
