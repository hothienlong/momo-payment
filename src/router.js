import express from 'express';
import momoRouter from './routes/momo';

const router = express.Router();

router.use('/momo', momoRouter);

export default router;
