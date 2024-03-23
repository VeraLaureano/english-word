import { Router } from 'express';
import { deleteWord, patchWord, postWord } from '../controllers/words.controller';
import { deleteSentence, patchSentence, postSentence } from '../controllers/sentence.controller';

const router = Router();

router.route('/words').post(postWord);
router.route('/words/:id').patch(patchWord).delete(deleteWord);
router.route('/sentences').post(postSentence)
router.route('/sentences/:id').patch(patchSentence).delete(deleteSentence)

export { router as privateRouter };