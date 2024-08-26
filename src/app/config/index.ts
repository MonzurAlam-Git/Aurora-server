import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  default_password: process.env.DEFAULT_PASSWORD,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
}

// Notes
/* 
Step-by-Step Breakdown
Import dotenv and path Modules:
Before this line of code, you would have imported the dotenv and path modules like this:

javascript
Copy code
const dotenv = require('dotenv');
const path = require('path');
dotenv is a package that loads environment variables from a .env file into process.env.
path is a built-in Node.js module that provides utilities for working with file and directory paths.
Current Working Directory (process.cwd()):

process.cwd() is a Node.js function that returns the current working directory of the Node.js process. Essentially, it tells you where your Node.js script is being run from.
Create the Path to the .env File:

path.join(process.cwd(), '.env') combines the current working directory path with the .env file name to create a full path to the .env file.
path.join() ensures that the path is constructed correctly, regardless of the operating system (Windows, macOS, Linux) you are using.
Configure dotenv to Load the .env File:

dotenv.config({ path: ... }) tells dotenv to load environment variables from the specified path. In this case, the path is the one created by path.join(process.cwd(), '.env').
*/
