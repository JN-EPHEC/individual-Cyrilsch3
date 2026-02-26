import { Router } from 'express';
import * as userController from "../controllers/userController.js";
import { checkIdParam } from "../middlewares/checkIdParam.js"; // Importation

const router = Router();

/**
 * @swagger
 * /api/users:
 * get:
 * summary: Liste des membres actifs
 * tags: [Users]
 * responses:
 * 200:
 * description: Succès
 * post:
 * summary: Ajouter un membre
 * tags: [Users]
 * responses:
 * 201:
 * description: Créé
 */
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);


router.get('/users/archived', userController.getArchivedUsers);


router.patch('/users/:id/archive',checkIdParam, userController.archiveUser);


router.patch('/users/:id/restore',checkIdParam, userController.restoreUser);


router.delete('/users/:id',checkIdParam, userController.deleteUser);

export default router;