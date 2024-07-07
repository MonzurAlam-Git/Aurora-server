import { ProductModel } from './productModel'
import { model, Schema } from 'mongoose'
import Product, {
  ProductMethods,
  Inventory,
  Variant,
  ProductModel_new,
} from './productInterface'
import { boolean } from 'zod'

const VariantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: [true, 'Variant type is required.'],
  },
  value: {
    type: String,
    required: [true, 'Variant value is required.'],
  },
})

const InventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: [true, 'Inventory quantity is required.'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Inventory inStock status is required.'],
  },
})

const productSchema = new Schema<Product, ProductModel_new, ProductMethods>({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required.'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required.'],
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required.'],
  },
  variants: {
    type: [VariantSchema],
    required: [true, 'Product variants are required.'],
  },
  inventory: {
    type: InventorySchema,
    required: [true, 'Product inventory is required.'],
  },
  isDeleted: {
    type: Boolean,
  },
})

// custom instance methods
productSchema.methods.isUserExists = async (name: string) => {
  const existingUser = await ProductModel.findOne({ name })
  return existingUser
}

export const ProductModel = model<Product, ProductModel_new>(
  'product-model',
  productSchema,
)