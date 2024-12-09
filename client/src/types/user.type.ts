export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
  createdAt: Date;
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
