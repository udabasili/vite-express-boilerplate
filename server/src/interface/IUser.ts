export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

export interface IUser {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role
  created_at: Date
  updated_at: Date
}

export interface IUserInputDTO {
  username: string
  firstname: string
  lastName: string
  email: string
  password: string
  role: string
}

export interface ILoginDTO {
  email: string
  password: string
}
