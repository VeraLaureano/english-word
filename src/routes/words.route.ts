import { Router } from 'express';
import { getAllWords, getOneWord  } from '../controllers/words.controller';

const router: Router = Router();

router.route('/').get(getAllWords);
router.route('/:id').get(getOneWord);

export { router as wordRouter };