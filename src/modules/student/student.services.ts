import mongoose from 'mongoose'
import { StudentModel } from './studentModel'
import AppError from '../../app/error/AppError'
import httpStatus from 'http-status'
import { UserModel } from '../users/usersModel'
import { TStudent } from './studentInterface'
import { studentSearchableFields } from './student.constant'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // Model.find(properties to search)
  // Model.find({ name: 'john', age: { $gte: 18 } })

  let searchTerm = ''

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
  }

  /*
    $or: [Searchable fields].map(field)=>
      [field] : {$regex : searchTerm, $options : i}
    */

  const searchResult = StudentModel.find({
    $or: ['email', 'name.lastName'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })
  // console.log(searchResult)
  // return searchResult

  // if spread is applied over array then [...query]
  // if spread is applied over object then {...query}

  // Excluding items for cleaning other query params from query of sorting functionality
  const excludedItems = ['searchTerm', 'email', 'sort', 'limit']
  const queryObj = { ...query }

  excludedItems.forEach((element) => delete queryObj[element])
  // return searchResult

  const filteredResult = searchResult
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  // Be dafault sort value , if its find any query in url then createdAt will be replaced
  let sort = '-createdAt'

  if (query?.sort) {
    sort = query.sort as string
  }

  const sortedResult = filteredResult.sort(sort)

  let limit = 1

  if (query?.limit) {
    limit = query.limit as number
  }
  const limitResult = await sortedResult.limit(limit)

  // console.log(queryObj)
  return limitResult
}

{
  /* PH Code */
}
// const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
//   const queryObj = { ...query } // copying req.query object so that we can mutate the copy object

//   let searchTerm = '' // SET DEFAULT VALUE

//   // IF searchTerm  IS GIVEN SET IT
//   if (query?.searchTerm) {
//     searchTerm = query?.searchTerm as string
//   }

//   // WE ARE DYNAMICALLY DOING IT USING LOOP
//   const searchQuery = StudentModel.find({
//     $or: studentSearchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   })

//   // FILTERING fUNCTIONALITY:

//   const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
//   excludeFields.forEach((el) => delete queryObj[el]) // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

//   const filterQuery = searchQuery
//     .find(queryObj)
//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     })
//   return filterQuery

//
//    SORTING FUNCTIONALITY:

//   let sort = '-createdAt'; // SET DEFAULT VALUE

//   IF sort  IS GIVEN SET IT

//    if (query.sort) {
//     sort = query.sort as string;
//   }

//    const sortQuery = filterQuery.sort(sort);

//    // PAGINATION FUNCTIONALITY:

//    let page = 1; // SET DEFAULT VALUE FOR PAGE
//    let limit = 1; // SET DEFAULT VALUE FOR LIMIT
//    let skip = 0; // SET DEFAULT VALUE FOR SKIP

//   // IF limit IS GIVEN SET IT

//   if (query.limit) {
//     limit = Number(query.limit);
//   }

//   // IF page IS GIVEN SET IT

//   if (query.page) {
//     page = Number(query.page);
//     skip = (page - 1) * limit;
//   }

//   const paginateQuery = sortQuery.skip(skip);

//   const limitQuery = paginateQuery.limit(limit);

//   // FIELDS LIMITING FUNCTIONALITY:

//   // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH

//   fields: 'name,email'; // WE ARE ACCEPTING FROM REQUEST
//   fields: 'name email'; // HOW IT SHOULD BE

//   let fields = '-__v'; // SET DEFAULT VALUE

//   if (query.fields) {
//     fields = (query.fields as string).split(',').join(' ');

//   }

//   const fieldQuery = await limitQuery.select(fields);

//   return fieldQuery;

//   */
// }

{
  /*    chat Gpt Code*/
}
// const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
//   let searchTerm = ''

//   if (query?.searchTerm) {
//     searchTerm = query.searchTerm as string
//   }

//   const queryObj = { ...query }
//   const excludedItems = ['searchTerm']
//   excludedItems.forEach((element) => delete queryObj[element])

//   const searchResult = await StudentModel.find({
//     $or: ['email', 'name.lastName'].map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//     ...queryObj, // Apply additional filters
//   })
//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     })
//   // return searchResult

//   // sort functionality implement
//   let sort = '-createdAt'

//   console.log(query)

//   if (query.sort) {
//     sort = query.sort
//   }
//   const sortResult = searchResult.sort(sort)
//   return sortResult
// }

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
