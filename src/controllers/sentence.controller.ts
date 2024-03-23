import { Request, Response } from "express";
import { asyncWrapper } from "../utils/asyncWrapper";
import { BAD_REQUEST, CREATED, EVERYTHING_OK, INTERNAL_SERVER_ERROR, NO_CONTENT } from "../config/statusCode";
import { createSentence, findAllSentences, findAndDeleteSentence, findAndUpdateSentence, findOneSentence } from "../services/sentence.service";
import { cleanXSS } from "../utils/sanitize";
import { escapeSpecialCharacters } from "../utils/escapeSpecialCharacters";
import { deleteSuccess, internalServerError } from "../utils/messages";
import { Sentence } from "../interfaces/sentence.interface";

export const getAllSentences = asyncWrapper(
  async (_req: Request, res: Response) => {
    const data = await findAllSentences()

    return res.status(EVERYTHING_OK).json(data)
  }
)

export const getOneSentence = asyncWrapper(
  async ({ params: { id } }: Request, res: Response) => {
    const cleanId: string = cleanXSS(id)
    const escapedId: string = escapeSpecialCharacters(cleanId)
    
    const data = findOneSentence(escapedId)

    if (!data)
      return res.status(INTERNAL_SERVER_ERROR).json(internalServerError('Sentence', id))

    return res.status(EVERYTHING_OK).json(data)
  }
)

export const postSentence = asyncWrapper(
  async ({ body: { enSentence, esSentence } }: Request, res: Response) => {
    if (!enSentence)
      return res.status(BAD_REQUEST).json({ message: 'field enSentence is empty' })

    const cleanEnSentence: string = cleanXSS(enSentence)
    const escapedEnSentence: string = escapeSpecialCharacters(cleanEnSentence)

    if (!esSentence)
      return res.status(BAD_REQUEST).json({ message: 'field esSentence is empty' })

    const cleanEsSentence: string = cleanXSS(esSentence)
    const escapedEsSentence: string = escapeSpecialCharacters(cleanEsSentence)

    const newSentence: Sentence = {
      en: escapedEnSentence,
      es: escapedEsSentence
    }

    const data = await createSentence(newSentence)

    return res.status(CREATED).json(data)
  }
)

export const patchSentence = asyncWrapper(
  async ({ body, params: { id } }: Request, res: Response) => {
    const  { enSentence, esSentence } = body

    if (!enSentence)
    return res.status(BAD_REQUEST).json({ message: 'field enSentence is empty' })

    const cleanEnSentence: string = cleanXSS(enSentence)
    const escapedEnSentence: string = escapeSpecialCharacters(cleanEnSentence)

    if (!esSentence)
      return res.status(BAD_REQUEST).json({ message: 'field esSentence is empty' })

    const cleanEsSentence: string = cleanXSS(esSentence)
    const escapedEsSentence: string = escapeSpecialCharacters(cleanEsSentence)

    const newSentence: Sentence = {
      en: escapedEnSentence,
      es: escapedEsSentence
    }

    const cleanId: string = cleanXSS(id)
    const escapedId: string = escapeSpecialCharacters(cleanId)

    const newData = await findAndUpdateSentence(escapedId, newSentence)

    if (!newData)
      return res.status(INTERNAL_SERVER_ERROR).json(internalServerError('Sentence', id))

    return res.status(CREATED).json(newData)
  }
)

export const deleteSentence = asyncWrapper(
  async ({ params: { id } }: Request, res: Response) => {
    const cleanId: string = cleanXSS(id)
    const escapedId: string = escapeSpecialCharacters(cleanId)

    const data = findAndDeleteSentence(escapedId)

    if (!data)
      return res.status(INTERNAL_SERVER_ERROR).json(internalServerError('Sentence', id))

    return res.status(NO_CONTENT).json(deleteSuccess)
  }
)
