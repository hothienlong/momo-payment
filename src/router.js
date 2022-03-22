import express from 'express';
import momoRouter from './routes/momo';
import userRouter from './routes/users';

const router = express.Router();

router.use('/users', userRouter);
router.use('/momo', momoRouter);

// Add more routes by doing like this:
// router.use("/products", productRouter);
//
// This will add a new route (http://localhost:3000/produccts/) all sub routes like http://localhost:3000/produccts/new
//  should be handled by productRouter

export default router;
