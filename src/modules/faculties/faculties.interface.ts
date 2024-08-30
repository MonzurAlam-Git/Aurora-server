import { Types } from 'mongoose'

export type TName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TFaculty = {
  id: string
  user: Types.ObjectId
  role: string
  designation: string
  name: TName
  gender: string
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  profileImage?: string
  academicDepartment: Types.ObjectId
  academicFaculty: Types.ObjectId
  isDeleted: boolean
}
