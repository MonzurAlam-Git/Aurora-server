import { model } from 'mongoose'
import Product from './productInterface'
import { ProductModel } from './productModel'

const insertProductIntoDB = async (product: Product) => {
  const productInstance = await ProductModel.create(product)
  return productInstance
}

export const ProductServices = {
  insertProductIntoDB,
}
