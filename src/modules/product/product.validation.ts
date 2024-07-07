import { z } from 'zod'

// Define the Variant schema
const VariantValidationSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required.' }),
  value: z.string().min(1, { message: 'Variant value is required.' }),
})

// Define the Inventory Validationschema
const InventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int()
    .min(0, { message: 'Inventory quantity must be a non-negative integer.' }),
  inStock: z.boolean().default(true), // Default to true if not provided
})

// Define the Product Validationschema
const ProductValidationSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required.' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required.' }),
  price: z
    .number()
    .positive({ message: 'Product price must be a positive number.' }),
  category: z.string().min(1, { message: 'Product category is required.' }),
  tags: z
    .array(z.string().min(1))
    .min(1, { message: 'Product tags are required.' }),
  variants: z
    .array(VariantValidationSchema)
    .min(1, { message: 'Product variants are required.' }),
  inventory: InventoryValidationSchema,
})

// Export the Product Validationschema
export { ProductValidationSchema }
