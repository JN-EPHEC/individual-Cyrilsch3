import { Router } from 'express';
import * as userController from "../controllers/userController.js";

const router = Router();


router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);


router.get('/users/archived', userController.getArchivedUsers);


router.patch('/users/:id/archive', userController.archiveUser);


router.patch('/users/:id/restore', userController.restoreUser);


router.delete('/users/:id', userController.deleteUser);

export default router;