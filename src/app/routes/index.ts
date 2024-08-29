import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/semester/semester.route';
import { FacultyRoutes } from '../modules/faculty/faculty.router';
import { DepartmentRoutes } from '../modules/department/Department.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/semesters',
    route: SemesterRoutes,
  },
  {
    path:'/faculties',
    route:FacultyRoutes
  },
  {
    path:'/departments',
    route:DepartmentRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;