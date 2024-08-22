import { model, Schema } from 'mongoose'
import Order from './orderInterface'

const orderSchema = new Schema<Order>({
  email: {
    type: String,
    required: [true, 'Customer email is required.'],
  },
  productId: {
    type: String,
    required: [true, 'Product ID is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Order price is required.'],
  },
  quantity: {
    type: Number,
    required: [true, 'Order quantity is required.'],
    min: [1, 'Quantity must be at least 1.'],
  },
})

export const OrderModel = model<Order>('Order-Model', orderSchema)
