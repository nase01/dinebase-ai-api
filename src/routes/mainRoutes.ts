import express from 'express';
import { execute } from '../controllers/mainController';

const router = express.Router();

router.post('/execute', execute);

export default router;