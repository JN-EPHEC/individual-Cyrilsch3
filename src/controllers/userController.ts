import type { Request, Response } from "express";
import User from "../models/User.js";

// Récupérer les membres actifs (non-archivés)
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({ where: { isArchived: false } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

// Récupérer les membres archivés
export const getArchivedUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({ where: { isArchived: true } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

// Créer un utilisateur avec Tag
export const createUser = async (req: Request, res: Response) => {
    try {
        const { nom, prenom, tag } = req.body;
        if (!nom || !prenom) {
            return res.status(400).json({ error: "Champs manquants" });
        }
        const newUser = await User.create({ 
            nom, 
            prenom, 
            tag: tag || 'INVITE', 
            isArchived: false 
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: (error as any).message });
    }
};

// Archiver un utilisateur
export const archiveUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await User.update({ isArchived: true }, { where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

// Restaurer un utilisateur
export const restoreUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await User.update({ isArchived: false }, { where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

// Supprimer définitivement
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (deleted) res.status(204).send();
        else res.status(404).json({ error: "Utilisateur non trouvé" });
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};