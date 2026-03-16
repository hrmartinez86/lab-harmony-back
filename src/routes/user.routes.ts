import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getProfile, updateProfile } from '../controllers/user.controller';
import { body } from 'express-validator';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

router.use(authenticate);

router.get('/profile', getProfile);
router.post('/profile', validate([body('email').optional().isEmail(), body('name').optional().notEmpty()]), updateProfile);
router.put('/profile', validate([body('email').optional().isEmail(), body('name').optional().notEmpty()]), updateProfile);

export default router;
