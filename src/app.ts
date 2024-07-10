import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { ProductRoutes } from './modules/product/product.routes'
import { OrderRoutes } from './modules/orders/order.routes'
const app: Application = express()

app.use(cors())
app.use(express.json())

// api endpoints
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('সব ঠিকঠাক')
})

export default app

// console.log(process.cwd());
