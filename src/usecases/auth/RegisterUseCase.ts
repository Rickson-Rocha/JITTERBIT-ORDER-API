import bcrypt from "bcryptjs";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { ConflictError } from "../../erros/ConflictError";

export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ message: string }> {
    const existing = await this.userRepository.findByEmail(email);

    if (existing) {
      throw new ConflictError(`Email "${email}" is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.create(email, hashedPassword);

    return { message: "User registered successfully." };
  }
}
