import mongoose, { Schema } from 'mongoose'
import { TAcademicFaculty } from './academicFaculty.interface'

// Define the schema based on the type
const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)

// Create and export the model
export const AcademicFacultyModel = mongoose.model<TAcademicFaculty>(
  'AcademicFacultyModel',
  academicFacultySchema,
)
