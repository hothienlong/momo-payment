import express from 'express';
import testController from '../controllers/test/testController';

const router = express.Router();

console.log('test');
router.get('/', testController);

export default router;
