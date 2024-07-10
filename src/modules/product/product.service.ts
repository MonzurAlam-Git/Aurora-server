import Product from './productInterface'
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
  // const result = await ProductModel.findOne({ _id: id })
  // Creating a new ObjectId instance
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { ObjectId } = require('mongodb')
  const objectId = new ObjectId(id)

  const result = await ProductModel.aggregate([{ $match: { _id: objectId } }])

  return result
}
// Delete Product
const deleteProductFromDB = async (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { ObjectId } = require('mongodb')
  const objectId = new ObjectId(id)

  const result = await ProductModel.updateOne(
    { _id: objectId },
    { isDeleted: true },
    // { upsert: true },
  )

  // console.log('id', result)
  return result
}

// Update Product
const updateProductFromDB = async (id: string, updatedDoc: Product) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { ObjectId } = require('mongodb')
  const objectId = new ObjectId(id)
  const result = await ProductModel.updateOne(
    { _id: objectId },
    { $set: updatedDoc },
  )
  return result
}

// Search product
const searchProductFromDB = async (searchTerm: string) => {
  // find
  // console.log('SearchProductFromDB b4', searchTerm)
  const result = await ProductModel.find({
    $name: { $text: { $search: searchTerm } },
  })
  // console.log('SearchProductFromDB after', result)
  return result
}

export const ProductServices = {
  insertProductIntoDB,
  getAllProduct,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductFromDB,
  searchProductFromDB,
}
