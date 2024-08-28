import { AcademicSemesterModel } from './../academicSemester/academicSemester.model'
import mongoose, { Mongoose } from 'mongoose'
import config from '../../app/config'
import AppError from '../../app/error/AppError'

import { TStudent } from '../student/studentInterface'
import { StudentModel } from '../student/studentModel'
import { generateStudentId } from './users.utils'
import { TUser } from './usersInterface'
import { UserModel } from './usersModel'
import httpStatus from 'http-status'

// My createStudent
const createStudentIntoDB = async (password: string, payload: TStudent) => {
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

  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admission semester not found') // Handle the null case
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    userData.id = await generateStudentId(admissionSemester)

    // 3. Create New User with filled user data
    const newUser = await UserModel.create([userData], { session })
    console.log(newUser)

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
    console.log(error)
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(404, 'User Creation process failed')
  }
}

{
  /* code from PH */
}
// const createStudentIntoDB = async (password: string, payload: TStudent) => {
//   // create a user object
//   const userData: Partial<TUser> = {}

//   //if password is not given , use deafult password
//   userData.password = password || (config.default_password as string)

//   //set student role
//   userData.role = 'student'

//   // find academic semester info
//   const admissionSemester = await AcademicSemesterModel.findById(
//     payload.admissionSemester,
//   )

//   const session = await mongoose.startSession()

//   if (!admissionSemester) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Admission semester not found') // Handle the null case
//   }
//   try {
//     session.startTransaction()
//     //set  generated id

//     userData.id = await generateStudentId(admissionSemester)

//     // create a user (transaction-1)
//     const newUser = await UserModel.create([userData], { session }) // array

//     //create a student
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
//     }
//     // set id , _id as user
//     payload.id = newUser[0].id
//     payload.user = newUser[0]._id //reference _id

//     // create a student (transaction-2)

//     const newStudent = await StudentModel.create([payload], { session })

//     if (!newStudent.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
//     }

//     await session.commitTransaction()
//     await session.endSession()

//     return newStudent
//   } catch (err: any) {
//     await session.abortTransaction()
//     await session.endSession()
//     throw new Error(err)
//   }
// }
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
