import { Request, Response } from 'express'
import { orderServices } from './order.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body
    const result = await orderServices.createOrderIntoDB(order)
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

export const OrderController = { createOrder }
