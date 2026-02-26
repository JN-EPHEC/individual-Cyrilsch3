import { type Request, type Response, type NextFunction } from 'express';

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    // Vérifie si l'ID est un nombre entier valide
    
const isInteger = /^\d+$/.test(String(id));

    if (!isInteger) {
        const error = new Error("L'identifiant fourni doit être un nombre entier valide.");
        (error as any).status = 400; // Définit le code d'erreur pour le errorHandler
        return next(error); 
    }

    next(); // Tout est ok, on passe au contrôleur
};