import mongoose from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterModel } from './academicSemester.model'
import { academicSemesterNameCodeMapper } from './academicSemester.utils'

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  //For example -> academicSemesterNameCodeMapper[Autumn] which value is 01 , on another hand , payLoad.code is 1 .... As the 01 === 1 , so the semester will be created

  if (academicSemesterNameCodeMapper[payLoad.name] === payLoad.code) {
    const result = await AcademicSemesterModel.create(payLoad)
    return result
  } else {
    throw new Error('Semester and Code are not Matched')
  }
}

const getAllSemestersFromDB = async () => {
  const result = await AcademicSemesterModel.find()
  return result
}

const getSingleAcademicSemester = async (semesterId: string) => {
  const ObjectId = mongoose.Types.ObjectId

  const result = await AcademicSemesterModel.findOne({
    _id: new ObjectId(semesterId),
  })
  // const result = await AcademicSemesterModel.findById(semesterId)
  return result
}

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllSemestersFromDB,
  getSingleAcademicSemester,
  updateAcademicSemesterIntoDB,
}
