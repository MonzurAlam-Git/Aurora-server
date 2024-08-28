import mongoose from 'mongoose'
import config from './app/config'
import app from './app'
import { Server } from 'http'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.db_url as string)
    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
main()

process.on('unhandledRejection', () => {
  console.log('unhandledRejection! Server Closing ...')
  if (server) {
    server.close(() => process.exit(1))
  } else {
    process.exit(1)
  }
})

process.on('uncaughtException', () => {
  console.log('uncaughtException! Server Closing ...')
  process.exit(1)
})

{
  /* app.listen returns a promise. If its rejected , the operations are done to close server gracefully*/
}
// process.on('unhandledRejection'): This listens for any unhandled promise rejections, which are errors that might occur outside the main() function.
