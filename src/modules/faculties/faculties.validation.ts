import { z } from 'zod'

const nameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
})

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
      id: z.string(),

      role: z.string(),
      designation: z.string(),
      name: nameValidationSchema,
      gender: z.string(),
      dateOfBirth: z.string().optional(),
      email: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string().optional(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
      isDeleted: z.boolean(),
    }),
  }),
})
export const FacultyValidation = {
  createFacultyValidationSchema,
}
