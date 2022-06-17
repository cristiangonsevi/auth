import { User } from "../user.model";

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: User;
}
