import { Router } from "express";
import validateRequest from "../../utils/reqValidate";
import { facultyValidation } from "./faculty.validation";
import { FacultyControllers } from "./faculty.controller";

const router = Router();
router.post('/create-faculty',
    validateRequest(facultyValidation.facultyValidationSchema),
    FacultyControllers.createFaculty
);

router.get('/',FacultyControllers.getAllFaculties);
router.get('/:facultyId',FacultyControllers.getSingleFaculty);
router.patch('/:facultyId',
    validateRequest(facultyValidation.facultyValidationSchema),
    FacultyControllers.updateFaculty
)

export const FacultyRoutes = router;