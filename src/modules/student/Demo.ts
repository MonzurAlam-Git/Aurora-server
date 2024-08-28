import { StudentModel } from './e:/Project_ Level 2/C O D E/Aurora-server/src/modules/student/studentModel'
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }
  let searchTerm = ''

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
  }
  /*
    $or: [Searchable fields].map(field)=>
      [field] : {$regex : searchTerm, $options : i}
    */

  const searchResult = StudentModel.find({
    $or: ['email', 'name.lastName'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })
  console.log(searchResult)
  // return searchResult

  // if spread is applied over array then [...query]
  // if spread is applied over object then {...query}

  const excludedItems = ['searchTerm']

  excludedItems.forEach((element) => delete queryObj[element])
  console.log(queryObj)
  // return searchResult

  const filteredResult = searchResult
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  return filteredResult
}
