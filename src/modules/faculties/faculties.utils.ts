import { UserModel } from '../users/usersModel'

export const findLastFacultyId = async () => {
  const lastFacultyId = await UserModel.findOne(
    { role: 'faculty' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastFacultyId?.id ? lastFacultyId.id : undefined
}

{
  /* if SemesterCode and Year Changes then start the ID from 0000 otherwise increment by 1 with previous ID */
}
export const generateFacultyId = async () => {
  let currentId = (0).toString()

  const lastFacultyId = await findLastFacultyId()

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(6)
  }
  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  const facultyId = `F-${incrementId}`
  console.log(facultyId)
  return facultyId
}
