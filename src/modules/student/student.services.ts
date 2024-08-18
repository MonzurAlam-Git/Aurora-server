import { TStudent } from './studentInterface'
import { StudentModel } from './studentModel'

const createStudentIntoDB = async (student: TStudent) => {
  const result = await StudentModel.create(student)
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.aggregate([{ $match: { id } }])
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
