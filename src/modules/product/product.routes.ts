import express from 'express'
import { ProductController } from './product.controller'

const router = express.Router()

router.get('/', ProductController.getAllProduct)
router.get('/:productId', ProductController.getSingleProduct)
router.post('/create-product', ProductController.createProduct)
router.delete('/:productId', ProductController.deleteProduct)

export const ProductRoutes = router