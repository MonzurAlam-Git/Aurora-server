import Order from './orderInterface'
import { OrderModel } from './orderModel'

const createOrderIntoDB = async (order: Order) => {
  const orderInstance = await OrderModel.create(order)
  return orderInstance
}

export const orderServices = { createOrderIntoDB }
