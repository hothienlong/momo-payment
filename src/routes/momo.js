import express from 'express';
import createOrderController from '../controllers/momo/createOrderController';
import refundController from '../controllers/momo/refundController';
import queryTransactionController from '../controllers/momo/queryTransactionController';

const router = express.Router();

router.post('/createOrder', createOrderController);
router.post('/refund', refundController);
router.post('/queryTransaction', queryTransactionController);

export default router;
