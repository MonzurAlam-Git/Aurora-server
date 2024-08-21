import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartmentModel } from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const faculty = await AcademicDepartmentModel.create(payload)
  return faculty
}

const getAllAcademicDepartmentFromDB = async () => {
  const allDepartment = await AcademicDepartmentModel.find()
  return allDepartment
}
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const singleFaculty = await AcademicDepartmentModel.findById(id)
  return singleFaculty
}
const updateAcademicDepartmentFromDB = async (
  id: string,
  updatedDoc: TAcademicDepartment,
) => {
  const singleFaculty = AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    { $set: updatedDoc },
    { new: true },
  )
  return singleFaculty
}
{
  /*{ new: true } option determines whether the method returns the updated document or the original one*/
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
}
