import express from 'express'
import { UserController } from './users.controller'

import { studentValidation } from '../student/student.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import { FacultyValidation } from '../faculties/faculties.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  UserController.createStudent,
)
router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculties,
)

// router.get('/', ProductController.getAllProduct)
// router.get('/:productId', ProductController.getSingleProduct)
// router.delete('/:productId', ProductController.deleteProduct)
// router.put('/:productId', ProductController.updateProduct)

// router.get('/search', ProductController.searchProduct)

export const UserRoutes = router
