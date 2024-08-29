import { Router } from "express";
import validateRequest from "../../utils/reqValidate";
import { DepartmentValidation } from "./Department.validation";
import { DepartmentControllers } from "./Department.controller";

const router = Router();

router.post('/create-department',
    validateRequest(DepartmentValidation.createDepartmentValidationSchema),
    DepartmentControllers.createDepartment
)

router.get('/',DepartmentControllers.getAllDepartments)
router.get('/:departmentId',DepartmentControllers.getSingleDepartment)
router.patch('/:departmentId',DepartmentControllers.updateDepartment)

export const DepartmentRoutes = router;