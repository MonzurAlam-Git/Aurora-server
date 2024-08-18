export type TUser = {
  id: number
  password: string
  needsPasswordChange: boolean
  role: 'student' | 'faculty' | 'admin'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

// export type NewUser = {
//   password: string
//   role: string
//   id: string
// }
