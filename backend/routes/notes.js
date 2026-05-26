import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getAll, getById, create, update, deleteNote } from '../controllers/noteController.js';

const router = Router();

router.use(auth);

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteNote);

export default router;
