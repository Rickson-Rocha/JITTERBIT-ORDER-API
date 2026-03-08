import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { AppError } from "../../erros/AppError";

export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ token: string; expiresIn: string }> {
    const savedUser = await this.userRepository.findByEmail(email);

    if (!savedUser) {
      throw new AppError("Invalid email or password.", 401);
    }

    const passwordMatch = await bcrypt.compare(password, savedUser.password);

    if (!passwordMatch) {
      throw new AppError("Invalid email or password.", 401);
    }

    const secret = process.env.JWT_SECRET || "fallback-secret";
    const expiresIn = process.env.JWT_EXPIRES_IN || "24h";

    const token = jwt.sign(
      { userId: savedUser.id, email: savedUser.email },
      secret,
      {
        expiresIn,
      } as jwt.SignOptions,
    );

    return { token, expiresIn };
  }
}
