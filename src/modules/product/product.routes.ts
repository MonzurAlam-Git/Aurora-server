import express from 'express'
import { ProductController } from './product.controller'
import { NextFunction, Request, Response } from 'express'

const router = express.Router()

// validateSchema MW
const validateSchema = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await console.log('Validate Schema Working')
  next()
}

router.post('/create-product', validateSchema, ProductController.createProduct)
router.get('/', ProductController.getAllProduct)
router.get('/:productId', ProductController.getSingleProduct)
router.delete('/:productId', ProductController.deleteProduct)
router.put('/:productId', ProductController.updateProduct)

// router.get('/search', ProductController.searchProduct)

export const ProductRoutes = router
