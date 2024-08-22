import { Request, Response } from 'express'
import { orderServices } from './order.service'
// import { z } from 'zod'
import { OrderValidationSchema } from './orders.validation'

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: OrderData } = req.body
    // handle order validation
    const zodOrderParser = OrderValidationSchema.parse(OrderData)

    const result = await orderServices.createOrderIntoDB(zodOrderParser)

    res.status(200).json({
      success: true,
      message: 'Order is created succesfully',
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

// Get All Orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderServices.getAllProductsFromDB()

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: orders,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}

export const OrderController = { createOrder, getAllOrders }
