import jwt from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET!;
const refreshSecret = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (userId: string) =>
    jwt.sign({ userId }, accessSecret, { algorithm: "HS256", expiresIn: "15m" });

export const generateRefreshToken = (userId: string) =>
    jwt.sign({ userId }, refreshSecret, { algorithm: "HS256", expiresIn: "7d" });

export const verifyAccessToken = (token: string) =>
    jwt.verify(token, accessSecret) as { userId: string };

export const verifyRefreshToken = (token: string) =>
    jwt.verify(token, refreshSecret) as { userId: string };
