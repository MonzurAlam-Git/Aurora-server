class AppError extends Error {
  public statusCode: number
  constructor(statusCode: number, errorMessage: string, stack = '') {
    super(errorMessage)
    this.statusCode = statusCode

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default AppError
