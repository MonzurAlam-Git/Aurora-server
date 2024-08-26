import mongoose, { Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../app/error/AppError'
import httpStatus from 'http-status'

//AppError = ErrorXExtraFeature

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFacultyModel',
    },
  },
  { timestamps: true },
)

// academicDepartmentSchema.pre('save', async function (next) {
//   const isDepartmentExists = await AcademicDepartmentModel.findOne({
//     name: this.name,
//   })

//   if (isDepartmentExists) {
//     throw new AppError(404, 'Department Already Exists')
//   }

//   next()
// })

// academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
//   const query = this.getQuery()
//   const isDepartmentExists = await AcademicDepartmentModel.findOne(query)
//   console.log('findOneAndUpdate data', query, isDepartmentExists)

//   if (!isDepartmentExists) {
//     throw new AppError(404, 'The Dept doesnt exist')
//   }

//   next()
// })

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepartmentModel.findOne(query)
  console.log('findOneAndUpdate data', query, isDepartmentExist)

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exist! ')
  }

  next()
})

// Create and export the model
export const AcademicDepartmentModel = mongoose.model<TAcademicDepartment>(
  'AcademicDepartmentModel',
  academicDepartmentSchema,
)
