import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../erros/AppError";

// Extende o tipo Request do Express para carregar o usuário autenticado
// Equivalente ao SecurityContextHolder do Spring Security
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
      };
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Missing or malformed Authorization header.", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "fallback-secret";
    const payload = jwt.verify(token, secret) as {
      userId: number;
      email: string;
    };
    req.user = payload;
    next();
  } catch {
    throw new AppError("Invalid or expired token.", 401);
  }
}
