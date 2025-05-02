import express from 'express';
import { ping } from '../controllers/mainController';

const router = express.Router();

router.get('/ping', ping);

export default router;