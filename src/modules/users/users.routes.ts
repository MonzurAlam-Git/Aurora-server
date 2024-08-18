import express from 'express'
import { UserController } from './users.controller'

import { studentValidation } from '../student/student.validation'
import { validateRequest } from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  UserController.createStudent,
)

// router.get('/', ProductController.getAllProduct)
// router.get('/:productId', ProductController.getSingleProduct)
// router.delete('/:productId', ProductController.deleteProduct)
// router.put('/:productId', ProductController.updateProduct)

// router.get('/search', ProductController.searchProduct)

export const UserRoutes = router
