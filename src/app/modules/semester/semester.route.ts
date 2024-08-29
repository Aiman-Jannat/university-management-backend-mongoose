import { Router } from 'express'
import validateRequest from '../../utils/reqValidate'
import { SemesterValidation } from './semester.validation'
import { SemesterControllers } from './semester.controllers'

const router = Router()

router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterValidationSchema),
  SemesterControllers.createSemester
)

router.get(
    '/:semesterId',
    SemesterControllers.getSingleSemester
)

router.patch(
    '/semesterId',
    validateRequest(SemesterValidation.updateSemesterValidationSchema),
    SemesterControllers.updateSingleSemester
)

router.get('/',SemesterControllers.getAllSemesters)

export const SemesterRoutes = router;
