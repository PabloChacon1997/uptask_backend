import jwt from 'jsonwebtoken'
import { envs } from '../config/envs';

type UserPayload = {
  id: string
}

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, envs.JWT_SECRET, {
    expiresIn: '180d'
  });

  return token;
}