import express from 'express';
import createOrderController from '../controllers/momo/createOrderController';
import refundController from '../controllers/momo/refundController';

const router = express.Router();

router.post('/createOrder', createOrderController);
router.post('/refund', refundController);

export default router;
