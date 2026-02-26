import { type Request, type Response, type NextFunction } from "express";
import User from "../models/User.js";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll({ where: { isArchived: false } });
        res.status(200).json(users);
    } catch (error) { next(error); }
};

export const getArchivedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll({ where: { isArchived: true } });
        res.status(200).json(users);
    } catch (error) { next(error); }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nom, prenom, tag } = req.body;
        const newUser = await User.create({ nom, prenom, tag: tag || 'INVITE', isArchived: false });
        res.status(201).json(newUser);
    } catch (error) { next(error); }
};

export const archiveUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.update({ isArchived: true }, { where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) { next(error); }
};

export const restoreUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.update({ isArchived: false }, { where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) { next(error); }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (deleted) res.status(204).send();
        else res.status(404).json({ error: "Utilisateur non trouvé" });
    } catch (error) { next(error); }
};