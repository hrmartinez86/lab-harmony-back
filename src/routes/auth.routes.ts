import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validate, registerValidation } from '../middlewares/validation.middleware';
import { body } from 'express-validator';

const router = Router();

router.post('/register', validate(registerValidation), register);
router.post('/login', validate([body('email').isEmail(), body('password').notEmpty()]), login);

export default router;
