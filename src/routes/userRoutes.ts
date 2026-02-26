import { Router } from 'express';
import * as userController from "../controllers/userController.js";

const router = Router();

// Routes pour les utilisateurs
router.get('/users', userController.getAllUsers);
router.get('/users/archived', userController.getArchivedUsers);
router.post('/users', userController.createUser);
router.delete('/users/:id', userController.deleteUser);

// Routes pour les actions spécifiques (PATCH)
router.patch('/users/:id/archive', userController.archiveUser);
router.patch('/users/:id/restore', userController.restoreUser);

export default router;