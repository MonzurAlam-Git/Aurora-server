import { Request, Response } from 'express'
import { ProductServices } from './product.service'
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
// const searchProduct = async (req: Request, res: Response) => {
//   try {
//     const queryData = req.query
//     console.log(queryData)
//     const result = await ProductServices.searchProductFromDB(queryData)

//     res.status(200).json({
//       success: true,
//       message: 'Product is Updated succesfully',
//       data: result,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'something went wrong',
//       error: error,
//     })
//   }
// }

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const queryData = req.query as unknown as string
    if (queryData) {
      const result = await ProductServices.searchProductFromDB(queryData)
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully',
        data: result,
      })
    } else {
      const result = await ProductServices.getAllProduct()
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully',
        data: result,
      })
    }

    // const result = await ProductServices.getAllProduct()
    // res.status(200).json({
    //   success: true,
    //   message: 'Product fetched succesfully',
    //   data: result,
    // })
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
      message: 'Product fetched successfully',
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
      message: 'Product deleted successfully',
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

// Update Product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { updatedDoc } = req.body
    const { productId } = req.params
    const result = await ProductServices.updateProductFromDB(
      productId,
      updatedDoc,
    )

    res.status(200).json({
      success: true,
      message: 'Product is Updated successfully',
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
  updateProduct,
  // searchProduct,
}
