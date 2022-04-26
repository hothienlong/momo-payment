import express from 'express';
import momoRouter from './routes/momo';
import paypalRouter from './routes/paypal';
import testRouter from './routes/test';

const router = express.Router();

router.use('/paypal', paypalRouter);
router.use('/momo', momoRouter);
router.use('/', testRouter);

export default router;
