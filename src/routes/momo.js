import express from 'express';
import createOrderController from '../controllers/momo/createOrderController';
import refundController from '../controllers/momo/refundController';
import queryTransactionController from '../controllers/momo/queryTransactionController';
import getSignaturePaymentController from '../controllers/momo/getSignaturePaymentController';

const router = express.Router();

router.post('/createOrder', createOrderController);
router.post('/refund', refundController);
router.post('/queryTransaction', queryTransactionController);
router.post('/getSignaturePayment', getSignaturePaymentController);

export default router;
