import { TerrorSource } from '../interface/error'

const handleDuplicateError = (err: any) => {
  const generateErrorMessage = () => {
    const errorMessage = err.errmsg

    const regex = /"([^"]+)"/
    const match = errorMessage.match(regex)

    if (match) {
      const extractedText = match[1]
      return extractedText
    }
  }

  const statusCode = 404
  const message = 'Duplicate Error'
  const errorSources: TerrorSource = [
    {
      path: '',
      message: `The department you want to create ${generateErrorMessage()} is already exist`,
    },
  ]

  return {
    statusCode,
    message,
    errorSources,
  }
}

export default handleDuplicateError
