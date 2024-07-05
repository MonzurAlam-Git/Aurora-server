"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
};
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
