import mongoose, { Schema } from 'mongoose'
import { TFaculty, TName } from './faculties.interface'

const nameSchema = new Schema<TName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Last name is required'] },
})

const facultySchema = new Schema<TFaculty>({
  id: { type: String, required: [true, 'ID is required'] },
  //   user: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: [true, 'User is required'],
  //   },
  role: { type: String, required: [true, 'Role is required'] },
  designation: { type: String, required: [true, 'Designation is required'] },
  name: { type: nameSchema, required: [true, 'Name is required'] },
  gender: { type: String, required: [true, 'Gender is required'] },
  dateOfBirth: { type: String },
  email: { type: String, required: [true, 'Email is required'] },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  profileImage: { type: String },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: [true, 'Academic department is required'],
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: [true, 'Academic faculty is required'],
  },
  isDeleted: {
    type: Boolean,
    required: [true, 'IsDeleted flag is required'],
    default: false,
  },
})

const FacultyModel = mongoose.model<TFaculty>('FacultyModel', facultySchema)

export default FacultyModel
