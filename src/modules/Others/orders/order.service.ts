import Order from './orderInterface'
import { OrderModel } from './orderModel'

const createOrderIntoDB = async (order: Order) => {
  const orderInstance = await OrderModel.create(order)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const { ObjectId } = require('mongodb')
  // const objectId = new ObjectId(orderInstance.productId)

  // const product = await ProductModel.find({
  //   _id: objectId,
  // })

  // const product = await ProductModel.aggregate([{ $match: { _id: objectId } }])
  // console.log('product', product)

  return orderInstance
}

const getAllProductsFromDB = async () => {
  const orders = await OrderModel.find()
  return orders
}

export const orderServices = { createOrderIntoDB, getAllProductsFromDB }
