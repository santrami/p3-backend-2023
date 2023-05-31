/* import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

const authenticationRoutes = (req:Request, res:Response, next: NextFunction)=>{
    export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
} */
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

 const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }

  jwt.verify(token, process.env.SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token de autenticación inválido' });
    }
    req.user = user as JwtPayload;
    next();
  });
};

export default authenticateToken;