import express from 'express';
import momoRouter from './routes/momo';
import userRouter from './routes/users';

const router = express.Router();

router.use('/users', userRouter);
router.use('/momo', momoRouter);

export default router;
