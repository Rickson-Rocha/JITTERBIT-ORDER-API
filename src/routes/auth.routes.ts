import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { RegisterUseCase } from "../usecases/auth/RegisterUseCase";
import { LoginUseCase } from "../usecases/auth/LoginUseCase";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { asyncHandler } from "../utils/asyncHandler";

const userRepository = new PrismaUserRepository();
const registerUseCase = new RegisterUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);
const authController = new AuthController(registerUseCase, loginUseCase);

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       409:
 *         description: Email já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/register",
  asyncHandler((req, res) => authController.register(req, res)),
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login e geração do token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 expiresIn:
 *                   type: string
 *       401:
 *         description: Email ou senha inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/login",
  asyncHandler((req, res) => authController.login(req, res)),
);

export default router;
