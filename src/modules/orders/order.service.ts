import Order from './orderInterface'
import { OrderModel } from './orderModel'

const createOrderIntoDB = async (order: Order) => {
  const orderInstance = await OrderModel.create(order)
  return orderInstance
}

const getAllProductsFromDB = async () => {
  const orders = await OrderModel.find()
  return orders
}

export const orderServices = { createOrderIntoDB, getAllProductsFromDB }
