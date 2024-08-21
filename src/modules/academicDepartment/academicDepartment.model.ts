import mongoose, { Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'

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

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  })

  if (isDepartmentExists) {
    throw new Error('Department Already Exists')
  }

  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function name(next) {
  const query = this.getQuery()
  const isDepartmentExists = await AcademicDepartmentModel.findOne(query)

  if (!isDepartmentExists) {
    throw new Error('Dept doesnt exist')
  }

  next()
})

// Create and export the model
export const AcademicDepartmentModel = mongoose.model<TAcademicDepartment>(
  'AcademicDepartmentModel',
  academicDepartmentSchema,
)
