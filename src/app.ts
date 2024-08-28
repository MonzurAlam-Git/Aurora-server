import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler'
import notFound from './middlewares/notFound'
import router from './routes'
const app: Application = express()

app.use(cors())
app.use(express.json())

// api endpoints

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('সব ঠিকঠাক')
  // Promise.reject()
})

app.use(globalErrorHandler)
app.use(notFound)

export default app

// console.log(process.cwd());
