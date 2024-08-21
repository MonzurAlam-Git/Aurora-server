import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyModel } from './academicFaculty.model'

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const faculty = await AcademicFacultyModel.create(payload)
  return faculty
}

const getAllAcademicFacultyFromDB = async () => {
  const allFaculty = await AcademicFacultyModel.find()
  return allFaculty
}
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const singleFaculty = await AcademicFacultyModel.findById(id)
  return singleFaculty
}
const updateAcademicFacultyFromDB = async (
  id: string,
  updatedDoc: TAcademicFaculty,
) => {
  const singleFaculty = AcademicFacultyModel.findByIdAndUpdate(
    id,
    { $set: updatedDoc },
    { new: true },
  )
  return singleFaculty
}
{
  /*{ new: true } option determines whether the method returns the updated document or the original one*/
}

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
}
