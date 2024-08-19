import config from '../../app/config'
import { TStudent } from '../student/studentInterface'
import { StudentModel } from '../student/studentModel'
import { TUser } from './usersInterface'
import { UserModel } from './usersModel'

//Year-Code-Number
function generateStudentId() {
  // Generate a random number between 0 and 999999
  const randomNumber = Math.floor(Math.random() * 1000000)

  // Format the number to ensure it has 6 digits, padding with leading zeros if necessary
  const formattedNumber = randomNumber.toString().padStart(6, '0')

  return parseInt(formattedNumber, 10) // Convert to number
}

const createStudentIntoDB = async (password: string, StudentData: TStudent) => {
  // Mongoose BuiltIn static Method
  // const productInstance = await ProductModel.create(product)

  // Instance method
  // const userInstance = new UserModel(user)

  //   if (await productInstance.isUserExists(product.name)) {
  //     throw new Error('User already Exists')
  //   }

  // export type NewUser = {
  //   password: string
  //   role: string
  //   id: string
  // }
  // console.log('Student data =>', StudentData)

  /* Here Student Data = Request Data */
  // Prepare User Data:
  const userData: Partial<TUser> = {}

  userData.id = generateStudentId()
  userData.password = password || (config.default_password as string)
  userData.role = 'student'
  // console.log('userData =>', userData)
  // Here userdata is just the json with provided data

  // const result = await userInstance.save()

  // Create New User
  const newUser = await UserModel.create(userData)
  // console.log('new user =>', newUser)

  //New User = A user data based on user model

  // Embed User IDs in Student Data
  if (Object.keys(newUser).length) {
    StudentData.id = newUser.id //embedded id
    StudentData.user = newUser._id //reference id
  }

  // create a new student (StudentXUser)
  const newStudent = await StudentModel.create(StudentData)
  // console.log('new Student', newStudent)

  return newStudent
}

export const UserServices = {
  createStudentIntoDB,
}

/*
This function, `createStudentIntoDB`, handles the creation of both a user and a student in the database. Here’s how it works:

1. **Prepare User Data:**
   - The function starts by preparing `userData`, an object containing the user's ID, password, and role. 
   - The `id` is hardcoded as `'202440106'`. 
   - The `password` is set to either the provided `password` or a default password from the configuration (`config.default_password`).
   - The `role` is set to `'student'`.

2. **Create a New User:**
   - The function then creates a new user by calling `UserModel.create(userData)`. 
   - This inserts the user data into the database and returns the created user (`newUser`).

3. **Embed User IDs in Student Data:**
   - If the user creation is successful (i.e., `newUser` is not empty), the function updates `StudentData` with the newly created user’s ID:
     - `StudentData.id = newUser.id;` embeds the user ID directly into the student data.
     - `StudentData.user = newUser._id;` stores the user's unique identifier (the MongoDB `_id`) as a reference in the student data.

4. **Create a New Student:**
   - Finally, the function creates a new student record by calling `StudentModel.create(StudentData)`.
   - This inserts the student data (including the user reference) into the database and returns the created student.

### Summary:
- **User creation:** The function first creates a user with the provided password and some default details.
- **Student creation:** It then links the student data to this user and saves it in the database.
- **Result:** The function returns the newly created student record.

*/
