import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
)

router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty)
router.get('/', AcademicFacultyController.getAllAcademicFaculty)
router.patch(
  '/:id',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
)
export const AcademicFacultyRoutes = router
