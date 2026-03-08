import { Request, Response, NextFunction } from "express";
import { AppError } from "../erros/AppError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
    return;
  }
  console.error(err);
  res.status(500).json({
    error: "InternalServerError",
    message: "An unexpected error occurred.",
  });
}
