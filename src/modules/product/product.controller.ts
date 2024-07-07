import { Request, Response } from 'express'
import { ProductServices } from './product.service'
import { ProductModel } from './productModel'
import { ProductValidationSchema } from './product.validation'

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body

    // Schema Validation using Zod
    const zodParsedData = ProductValidationSchema.parse(product)
    const result = await ProductServices.insertProductIntoDB(zodParsedData)

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

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProduct()

    res.status(200).json({
      success: true,
      message: 'Product is retrived succesfully',
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getSingleProductFromDB(productId)

    res.status(200).json({
      success: true,
      message: 'Product is retrived succesfully',
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.deleteProductFromDB(productId)

    res.status(200).json({
      success: true,
      message: 'Product is deleted succesfully',
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
  getAllProduct,
  getSingleProduct,
  deleteProduct,
}
