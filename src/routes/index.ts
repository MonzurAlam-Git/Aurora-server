import { Router } from 'express'
import { StudentRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/users/users.routes'
import { ProductRoutes } from '../modules/product/product.routes'
import { OrderRoutes } from '../modules/orders/order.routes'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
