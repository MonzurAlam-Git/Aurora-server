import mongoose, { Schema } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  AcademicSemesterCode,
  AcademicSemesterNames,
  Months,
} from './academicSemester.const'
import AppError from '../../app/error/AppError'

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: AcademicSemesterNames,
    required: true,
  },
  code: {
    type: String,
    enum: AcademicSemesterCode,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Pre hook to check semster duplication
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  })
  if (isSemesterExists) {
    throw new AppError(404, 'Semester Already Exists')
  } else {
    next()
  }
})

// Create the model
export const AcademicSemesterModel = mongoose.model(
  'AcademicSemester',
  academicSemesterSchema,
)
