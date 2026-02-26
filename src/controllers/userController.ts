import { type Request, type Response, type NextFunction } from "express";
import User from "../models/User.js";

// Récupérer les membres actifs (non-archivés)
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll({ where: { isArchived: false } });
        res.status(200).json(users);
    } catch (error) {
        next(error); // Envoie l'erreur au errorHandler global
    }
};

// Récupérer les membres archivés
export const getArchivedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll({ where: { isArchived: true } });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Créer un utilisateur avec Tag
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nom, prenom, tag } = req.body;
        if (!nom || !prenom) {
            // On peut créer une erreur personnalisée pour le errorHandler
            const error = new Error("Champs 'nom' et 'prenom' manquants");
            (error as any).status = 400;
            throw error;
        }
        const newUser = await User.create({ 
            nom, 
            prenom, 
            tag: tag || 'INVITE', 
            isArchived: false 
        });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

// Archiver un utilisateur
export const archiveUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await User.update({ isArchived: true }, { where: { id } });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Restaurer un utilisateur
export const restoreUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await User.update({ isArchived: false }, { where: { id } });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Supprimer définitivement
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            const error = new Error("Utilisateur non trouvé");
            (error as any).status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};