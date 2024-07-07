import { model } from 'mongoose'
import Product from './productInterface'
import { ProductModel } from './productModel'
import mongoose from 'mongoose'

const insertProductIntoDB = async (product: Product) => {
  const productInstance = await ProductModel.create(product)
  return productInstance
}

const getAllProduct = async () => {
  const products = await ProductModel.find()
  return products
}

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id })
  return result
}

export const ProductServices = {
  insertProductIntoDB,
  getAllProduct,
  getSingleProductFromDB,
}
