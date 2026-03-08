import { Request, Response } from "express";
import { RegisterUseCase } from "../usecases/auth/RegisterUseCase";
import { LoginUseCase } from "../usecases/auth/LoginUseCase";

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const result = await this.registerUseCase.execute(email, password);
    res.status(201).json(result);
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const result = await this.loginUseCase.execute(email, password);
    res.status(200).json(result);
  }
}
