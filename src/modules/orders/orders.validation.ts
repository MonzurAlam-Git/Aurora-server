import { z } from 'zod'

// Define the Order schema
const OrderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .min(1, { message: 'Customer email is required.' }),
  productId: z.string().min(1, { message: 'Product ID is required.' }),
  price: z
    .number()
    .positive({ message: 'Order price must be a positive number.' }),
  quantity: z
    .number()
    .int()
    .min(1, { message: 'Quantity must be at least 1.' }),
})

// Export the Order schema
export { OrderValidationSchema }
