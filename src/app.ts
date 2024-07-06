import { OrderRoutes } from './../dist/app/Modules/Orders/order.routes'
import { ProductRoutes } from './../dist/app/Modules/Product/product.routes'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
const app: Application = express()

app.use(cors())
app.use(express.json())

// api endpoints
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Tawaqaltu Olallah')
})

export default app

// console.log(process.cwd());
