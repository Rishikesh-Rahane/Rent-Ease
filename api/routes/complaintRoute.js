import express from 'express';
import { createComplaint,getComplaint,deleteComplaint ,getComplaintSingle} from '../controllers/complaintController.js';

const router = express.Router();

router.post('/create', createComplaint);
router.delete('/delete/:id', deleteComplaint);
router.get('/get/:id', getComplaintSingle);
router.get('/get', getComplaint);

export default router;