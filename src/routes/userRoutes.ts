import { Router } from 'express';
import type { Request, Response } from 'express';
import User from '../models/User.js'; // Vérifiez bien le chemin et l'extension .js

const router = Router();

// GET /api/users : Récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({ where: { isArchived: false } });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération" });
    }
});

// DELETE /api/users/:id : Supprimer un utilisateur
router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deleted = await User.destroy({ where: { id } }); // Méthode pour le DELETE
        
        if (deleted) {
            res.status(204).send(); // 204 = Succès, pas de contenu à renvoyer
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
});

router.post('/users', async (req, res) => {
    try {
        const { nom, prenom, tag } = req.body;
        // Validation minimale (Concept 6.2.4)
        if (!nom || !prenom) return res.status(400).json({ error: "Champs manquants" });

        const newUser = await User.create({ 
            nom, 
            prenom, 
            tag: tag || 'INVITE', 
            isArchived: false 
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la création" });
    }
});
// Récupérer les archivés
router.get('/users/archived', async (req, res) => {
    const users = await User.findAll({ where: { isArchived: true } });
    res.json(users);
});

// Action Archiver
router.patch('/users/:id/archive', async (req, res) => {
    await User.update({ isArchived: true }, { where: { id: req.params.id } });
    res.status(204).send();
});

// Action Restaurer
router.patch('/users/:id/restore', async (req, res) => {
    await User.update({ isArchived: false }, { where: { id: req.params.id } });
    res.status(204).send();
});

export default router;