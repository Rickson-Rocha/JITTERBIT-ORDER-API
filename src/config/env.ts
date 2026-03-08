export function validateEnv(): void {
  const required = ["DATABASE_URL", "JWT_SECRET"];

  required.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
}
