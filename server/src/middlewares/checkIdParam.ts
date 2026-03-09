import { type Request, type Response, type NextFunction } from 'express';

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
    // On ajoute "|| ''" pour garantir qu'on a au moins une chaîne vide
    const id = req.params.id || ""; 

    // Maintenant .test(id) fonctionnera sans erreur
    const isInteger = /^\d+$/.test(String(id));

    if (!isInteger) {
        const error = new Error("L'identifiant fourni doit être un nombre entier valide.");
        (error as any).status = 400;
        return next(error);
    }
    next();
};