import { Router } from "express";
import { getAllSentences, getOneSentence } from "../controllers/sentence.controller";

const router: Router = Router()

router.route('/').get(getAllSentences)
router.route('/:id').get(getOneSentence)

export { router as sentenceRouter }