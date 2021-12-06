import express from 'express';
import ProducerController from '../controllers/controllers.producer';

const router = express.Router();

router.post('/produce', ProducerController.produce);

router.get('/status/:id', ProducerController.status);

export default router;
