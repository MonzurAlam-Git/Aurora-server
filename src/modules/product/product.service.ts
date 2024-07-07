import { model } from 'mongoose'
import Product from './productInterface'
import mongoose from 'mongoose'
import { ProductModel } from './productModel'

const insertProductIntoDB = async (product: Product) => {
  // Mongoose BuiltIn static Method
  // const productInstance = await ProductModel.create(product)

  // Instance method
  const productInstance = new ProductModel(product)

  if (await productInstance.isUserExists(product.name)) {
    throw new Error('User already Exists')
  }

  const result = await productInstance.save()

  return result
}

const getAllProduct = async () => {
  const products = await ProductModel.find()
  return products
}

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id })
  return result
}
const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.updateOne({ _id: id }, { isDeleted: true })
  return result
}

export const ProductServices = {
  insertProductIntoDB,
  getAllProduct,
  getSingleProductFromDB,
  deleteProductFromDB,
}
