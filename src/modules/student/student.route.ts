import express from 'express'
import { StudentControllers } from './student.controller'
import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import { createStudentValidationSchema } from './student.validation'

const router = express.Router()

// Reusable ValidateSchema MiddleWare
// const createStudentMW = (schema: AnyZodObject) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // Validate Schema Process
//       schema.parseAsync({
//         body: req.body,
//       })
//       return next()
//     } catch (error) {
//       next(error)
//     }
//   }
// }

router.get('/all-students', StudentControllers.getAllStudents)
router.post('/create-student', StudentControllers.createStudent)
router.get('/:studentId', StudentControllers.getSingleStudent)
router.delete('/:studentId', StudentControllers.deleteStudent)

export const StudentRoutes = router
