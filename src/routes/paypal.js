import express from 'express';
import createOrderController from '../controllers/paypal/createOrderController';

const router = express.Router();

router.post('/createOrder', createOrderController);

export default router;
