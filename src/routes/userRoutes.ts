import { Router } from 'express';
import type { Request, Response } from 'express';
import User from '../models/User.js'; // Vérifiez bien le chemin et l'extension .js

const router = Router();

// GET /api/users : Récupérer tous les utilisateurs
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll(); // Méthode Sequelize pour le SELECT *
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération" });
    }
});

// POST /api/users : Créer un utilisateur
router.post('/users', async (req: Request, res: Response) => {
    try {
        const { nom, prenom } = req.body; // Récupère les données du JSON envoyé
        const newUser = await User.create({ nom, prenom }); // Méthode pour l'INSERT
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la création" });
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

export default router;