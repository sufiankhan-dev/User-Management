export interface UserType {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  createdAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}
