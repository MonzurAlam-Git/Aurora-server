import { z } from 'zod'

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'password cant be more than 20 characters' }),

  role: z.enum(['student', 'faculty', 'admin']),
  //   Role will be set from url like "api/create-student so the role is student "

  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
})
