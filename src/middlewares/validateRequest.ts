import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Validation
      await schema.parseAsync({
        body: req.body,
      })

      return next()
    } catch (error) {
      next(error)
    }
  }
}
