import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload; // Расширяем тип Request, добавляя свойство user
        }
    }
}