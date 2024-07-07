import { Model } from 'mongoose'
// import { ProductModel } from './productModel'
export type Variant = {
  type: string
  value: string
}

export type Inventory = {
  quantity: number
  inStock: boolean
}

type Product = {
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  variants: Variant[]
  inventory: Inventory
  isDeleted: { type: boolean; default: false }
}

export type ProductMethods = {
  isUserExists(name: string): Promise<Product | null>
}

export type ProductModel_new = Model<
  Product,
  Record<string, never>,
  ProductMethods
>

export default Product
