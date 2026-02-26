import { type Request, type Response, type NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    // Affiche par ex: 2024-03-20T10:00:00.000Z - GET /api/users
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Indispensable : sans next(), la requête reste bloquée ici et le navigateur charge à l'infini
    next(); 
};