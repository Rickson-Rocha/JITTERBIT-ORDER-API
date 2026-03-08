import { prisma } from "../config/prisma";
import { UserDTO } from "../dtos/user.dto";
import { IUserRepository } from "../interfaces/IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UserDTO | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(email: string, hashedPassword: string): Promise<UserDTO> {
    return prisma.user.create({
      data: { email, password: hashedPassword },
    });
  }
}
