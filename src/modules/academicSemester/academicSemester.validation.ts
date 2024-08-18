import { string, z } from 'zod'
import {
  AcademicSemesterCode,
  AcademicSemesterNames,
  Months,
} from './academicSemester.const'

// Enum for months
const months = z.enum([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
])

// Zod schema for AcademicSemester
const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterNames] as [string, ...string[]]),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    year: z.number(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
    // createdAt: z
    //   .date()
    //   .optional()
    //   .default(() => new Date()),
    // updatedAt: z
    //   .date()
    //   .optional()
    //   .default(() => new Date()),
  }),
})

export const academicSemesterValidation = {
  createAcademicSemesterValidationSchema,
}
