import express from 'express';
import momoRouter from './routes/momo';
import paypalRouter from './routes/paypal';

const router = express.Router();

router.use('/paypal', paypalRouter);
router.use('/momo', momoRouter);
router.use('/', momoRouter);

export default router;
