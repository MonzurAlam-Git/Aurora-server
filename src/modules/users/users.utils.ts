import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { UserModel } from './usersModel'

export const findLastStudentId = async () => {
  const lastStudentId = await UserModel.findOne(
    { role: 'student' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastStudentId?.id ? lastStudentId.id : undefined
}

{
  /* if SemesterCode and Year Changes then start the ID from 0000 otherwise increment by 1 with previous ID */
}
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString()

  const lastStudentId = await findLastStudentId()
  console.log('lastStudentId', lastStudentId)
  const lastStudentYear = Number(lastStudentId?.substring(0, 4))
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6)

  const currentStudentYear = payload.year
  const currentStudentSemesterCode = payload.code

  if (
    lastStudentId &&
    lastStudentYear === currentStudentYear &&
    lastStudentSemesterCode === currentStudentSemesterCode
  ) {
    currentId = lastStudentId.substring(6)
  }
  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  const studentId = `${payload.year}${payload.code}${incrementId}`
  console.log(studentId)
  return studentId
}
