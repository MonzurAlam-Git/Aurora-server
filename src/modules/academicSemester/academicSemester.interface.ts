export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type TAcademicSemesterNames = 'Autumn' | 'Summer' | 'Fall'
export type TAcademicSemesterCode = '01' | '02' | '03'

export type TAcademicSemester = {
  id: string
  name: TAcademicSemesterNames
  code: TAcademicSemesterCode
  year: number
  startMonth: TMonths
  endMonth: TMonths
  createdAt: Date
  updatedAt: Date
}

export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string
}
