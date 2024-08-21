import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from '../academicDepartment/academicDepartment.validation'
import { AcademicDepartmentController } from '../academicDepartment/academicDepartment.controller'

const router = express.Router()

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
)

router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment)
router.get('/', AcademicDepartmentController.getAllAcademicDepartment)
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
)

export const academicDepartmentRoutes = router
