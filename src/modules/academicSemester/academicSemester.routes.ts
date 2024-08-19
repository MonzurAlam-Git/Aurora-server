import { academicSemesterValidation } from './academicSemester.validation'
import express from 'express'
import { academicSemesterController } from './academicSemester.controller'
import { validateRequest } from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
)

router.get('/', academicSemesterController.getAllSemesters)
router.get('/:semesterId', academicSemesterController.getSingleSemester)
router.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterController.updateSemester,
)

export const AcademicSemesterRoutes = router
