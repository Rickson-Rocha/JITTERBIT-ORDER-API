import { UserDTO } from "../dtos/user.dto";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserDTO | null>;
  create(email: string, hashedPassword: string): Promise<UserDTO>;
}
