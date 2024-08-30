import mongoose from 'mongoose'
import { StudentModel } from './studentModel'
import AppError from '../../app/error/AppError'
import httpStatus from 'http-status'
import { UserModel } from '../users/usersModel'
import { TStudent } from './studentInterface'
import { studentSearchableFields } from './student.constant'
import QueryBuilder from '../../app/builder/queryBuilder'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // Model.find(properties to search)
  // Model.find({ name: 'john', age: { $gte: 18 } })

  // let searchTerm = ''

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }

  // /*
  //   $or: [Searchable fields].map(field)=>
  //     [field] : {$regex : searchTerm, $options : i}
  //   */

  // const searchQuery = StudentModel.find({
  //   $or: ['email', 'name.lastName'].map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // // if spread is applied over array then [...query]
  // // if spread is applied over object then {...query}

  // // Excluding items for cleaning other query params from query of sorting functionality
  // const excludedItems = ['searchTerm', 'email', 'sort', 'limit', 'page']
  // const queryObj = { ...query }

  // excludedItems.forEach((element) => delete queryObj[element])

  // const filteredQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   })

  // // Be default sort value , if its find any query in url then createdAt will be replaced
  // let sort = '-createdAt'

  // if (query?.sort) {
  //   sort = query.sort as string
  // }

  // const sortedQuery = filteredQuery.sort(sort)
  // // console.log(sortedQuery)

  // let page = 1
  // let limit = 1
  // let skip = 0

  // if (query?.limit) {
  //   limit = Number(query.limit)
  // }

  // if (query?.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }

  // const paginatedQuery = sortedQuery.skip(skip)

  // const limitQuery = paginatedQuery.limit(limit)

  // // select field
  // let fields = '-__v'

  // if (query?.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  //   console.log(fields)
  // }
  // const fieldQuery = await limitQuery.select(fields)

  // return fieldQuery

  //Issue : field Search and ALl students returning 1 element -
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fieldSearch()

  const result = await studentQuery.queryModel
  console.log(result)
  return result
}

{
  /* PH Code */
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
