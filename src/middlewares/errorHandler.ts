import { type Request, type Response, type NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Affiche l'erreur complète dans le terminal pour le développeur
    console.error(`[ERROR] ${err.stack || err.message}`);

    // Récupère le statut (par défaut 500) et le message
    const status = err.status || 500;
    const message = err.message || "Une erreur interne est survenue sur le serveur.";

    // Envoie la réponse JSON propre au client
    res.status(status).json({
        error: message,
        status: status
    });
};