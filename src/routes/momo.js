import express from 'express';
import createPaymentUrlController from '../controllers/momo/createPaymentUrlController';
import refundController from '../controllers/momo/refundController';

const router = express.Router();

router.post('/createPaymentUrl', createPaymentUrlController);
router.post('/refund', refundController);

export default router;
