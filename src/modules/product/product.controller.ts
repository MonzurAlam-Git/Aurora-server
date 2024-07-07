import { Request, Response } from 'express'
import { ProductServices } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body
    const result = await ProductServices.insertProductIntoDB(product)

    res.status(200).json({
      success: true,
      message: 'Product is created succesfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}

export const ProductController = {
  createProduct,
}
