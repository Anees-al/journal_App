import express from 'express';
const router = express.Router();
import {
  getJournals,
  createJournal,
  deleteJournal,
  updateJournal,
} from '../controllers/journalController.js';

router.route('/').get(getJournals).post(createJournal);

router.route('/:id').put(updateJournal).delete(deleteJournal);

export default router;
