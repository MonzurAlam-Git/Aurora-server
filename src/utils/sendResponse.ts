import { Response } from 'express'

type TResponse<T> = {
  statusCode: number
  success: boolean
  message?: string
  data: T
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  })
}

// <T>: This defines a generic type parameter T for the sendResponse function. Generics allow you to define a function, class, or interface that can work with different data types while maintaining type safety. The type parameter T can be any type, and it allows the sendResponse function to be used with various types of data

export default sendResponse
