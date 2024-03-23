import { Request, Response } from 'express';
import { asyncWrapper } from '../utils/asyncWrapper';
import WordModel from '../models/word.model';
import { cleanXSS } from '../utils/sanitize';
import { escapeSpecialCharacters } from '../utils/escapeSpecialCharacters';
import { createWord, findAllWords, findAndDeleteWord, findAndUpdateWord, findOneWord } from '../services/word.service';
import { BAD_REQUEST, CREATED, EVERYTHING_OK, INTERNAL_SERVER_ERROR, NO_CONTENT } from '../config/statusCode';
import { deleteSuccess, internalServerError } from '../utils/messages';
import { Word } from '../interfaces/word.interface';

/**
 * @method [GET]
 * @description search all words from the db
 */
// This function retrieves all words from the backend.
export const getAllWords = asyncWrapper(
  async ({ query }: Request, res: Response) => {
    // Extract the 'page' and 'perPage' parameters from the query.
    const { page, perPage } = query;

    // Get the total count of words in the database.
    const totalWords: number = await WordModel.countDocuments({});

    // Initialize default values for page number and words per page.
    let pageNumber: number = 1;
    let wordsPerPage: number = totalWords;

    // If 'page' is provided, sanitize and parse it.
    if (page) {
      const cleanPage: string = cleanXSS(page as string);
      const escapedPage: string = escapeSpecialCharacters(cleanPage);
      pageNumber = parseInt(escapedPage, 10);
    }

    // If 'perPage' is provided, sanitize and parse it.
    if (perPage) {
      const cleanWordsPerPage: string = cleanXSS(perPage as string);
      const escapedWordsPerPage: string = escapeSpecialCharacters(cleanWordsPerPage);
      wordsPerPage = parseInt(escapedWordsPerPage, 10);
    }

    // Retrieve words based on the specified page number and words per page.
    const data = await findAllWords(pageNumber, wordsPerPage);

    // Return the retrieved data as a JSON response with HTTP status code 200 (OK).
    return res.status(EVERYTHING_OK).json(data);
  }
);


/**
 * @method [GET]
 * @description search a word with the id in params
 */
// This function retrieves a single word from the backend.
export const getOneWord = asyncWrapper(
  async ({ params: { id } }: Request, res: Response) => {
    // Sanitize and escape the provided 'id' parameter.
    const cleanId: string = cleanXSS(id);
    const escapedId: string = escapeSpecialCharacters(cleanId);

    // Retrieve the word data corresponding to the sanitized 'id'.
    const data = await findOneWord(escapedId);

    // If no data is found, return an internal server error response.
    if (!data)
      return res.status(INTERNAL_SERVER_ERROR).json(internalServerError('WORD', id));

    // Return the retrieved data as a JSON response with HTTP status code 200 (OK).
    return res.status(EVERYTHING_OK).json(data);
  }
);

// ADMIN OPERATIONS
/**
 * @method [POST]
 * @description post a new word in the database
 */
export const postWord = asyncWrapper(
  async ({ body }: Request, res: Response) => {
    // Destructure the properties from the request body
    const { enWord, esWord, sentence1, sentence2, sentence3 } = body;
    
    // Check if the 'enWord' field is empty
    if (!enWord)
      return res.status(BAD_REQUEST).json({ message: 'enWord field empty' });

    // Clean and escape the 'enWord' value to prevent XSS attacks
    const cleanEnWord: string = cleanXSS(enWord);
    const escapedEnWord: string = escapeSpecialCharacters(cleanEnWord);

    // Check if the 'esWord' field is empty
    if (!esWord)
      return res.status(BAD_REQUEST).json({ message: 'esWord field empty' });

    // Clean and escape the 'esWord' value
    const cleanEsWord: string = cleanXSS(esWord);
    const escapedEsWord: string = escapeSpecialCharacters(cleanEsWord);

    // Check if the 'sentence1' field is empty
    if (!sentence1)
      return res.status(BAD_REQUEST).json({ message: 'sentence1 field empty' });

    // Clean and escape the 'sentence1' value
    const cleanSentence1: string = cleanXSS(sentence1);
    const escapedSentence1: string = escapeSpecialCharacters(cleanSentence1);

    // Check if the 'sentence2' field is empty
    if (!sentence2)
      return res.status(BAD_REQUEST).json({ message: 'sentence2 field empty' });

    // Clean and escape the 'sentence2' value
    const cleanSentence2: string = cleanXSS(sentence2);
    const escapedSentence2: string = escapeSpecialCharacters(cleanSentence2);

    // Check if the 'sentence3' field is empty
    if (!sentence3)
      return res.status(BAD_REQUEST).json({ message: 'sentence3 field empty' });

    // Clean and escape the 'sentence3' value
    const cleanSentence3: string = cleanXSS(sentence3);
    const escapedSentence3: string = escapeSpecialCharacters(cleanSentence3);
  
    // Create a new word object with cleaned and escaped values
    const newWord: Word = {
      en: escapedEnWord,
      es: escapedEsWord,
      sentences: [escapedSentence1, escapedSentence2, escapedSentence3]
    };

    // Call the 'createWord' function with the new word data
    const data = await createWord(newWord);
    
    // Return the response with the created data
    return res.status(CREATED).json(data);
  }
);

/**
 * @method [PATCH]
 * @description update a found word
 */
// This exports a function called "patchWord" as a constant.
// It's wrapped in an "asyncWrapper" to handle asynchronous operations.
export const patchWord = asyncWrapper(
  async ({ params: { id }, body }: Request, res: Response) => {
    // Destructure properties from the request body.
    const { enWord, esWord, sentence1, sentence2, sentence3 } = body;

    // Check if the "enWord" field is empty.
    if (!enWord)
      return res.status(BAD_REQUEST).json({ message: 'enWord field empty' });

    // Clean and escape the "enWord" value.
    const cleanEnWord: string = cleanXSS(enWord);
    const escapedEnWord: string = escapeSpecialCharacters(cleanEnWord);

    // Check if the "esWord" field is empty.
    if (!esWord)
      return res.status(BAD_REQUEST).json({ message: 'esWord field empty' });

    // Clean and escape the "esWord" value.
    const cleanEsWord: string = cleanXSS(esWord);
    const escapedEsWord: string = escapeSpecialCharacters(cleanEsWord);

    // Check if the "sentence1" field is empty.
    if (!sentence1)
      return res.status(BAD_REQUEST).json({ message: 'sentence1 field empty' });

    // Clean and escape the "sentence1" value.
    const cleanSentence1: string = cleanXSS(sentence1);
    const escapedSentence1: string = escapeSpecialCharacters(cleanSentence1);

    // Check if the "sentence2" field is empty.
    if (!sentence2)
      return res.status(BAD_REQUEST).json({ message: 'sentence2 field empty' });

    // Clean and escape the "sentence2" value.
    const cleanSentence2: string = cleanXSS(sentence2);
    const escapedSentence2: string = escapeSpecialCharacters(cleanSentence2);

    // Check if the "sentence3" field is empty.
    if (!sentence3)
      return res.status(BAD_REQUEST).json({ message: 'sentence3 field empty' });

    // Clean and escape the "sentence3" value.
    const cleanSentence3: string = cleanXSS(sentence3);
    const escapedSentence3: string = escapeSpecialCharacters(cleanSentence3);

    const newWord: Word = {
      en: escapedEnWord,
      es: escapedEsWord,
      sentences: [escapedSentence1, escapedSentence2, escapedSentence3]
    }

    // Clean and escape the "id" parameter.
    const cleanId: string = cleanXSS(id);
    const escapedId: string = escapeSpecialCharacters(cleanId);

    // Call the "findAndUpdateWord" function with the escaped "id" and updated data.
    const newData = await findAndUpdateWord(escapedId, newWord);

    // If no new data is returned, return an internal server error.
    if (!newData)
      return res.status(INTERNAL_SERVER_ERROR).json(internalServerError('word', id));

    return res.status(CREATED).json(newData);
  }
);

/**
 * @method [DELETE]
 * @description delete a word with id from the database
 */
// This exports a function called "deleteWord" as a constant.
// It's wrapped in an "asyncWrapper" to handle asynchronous operations.
export const deleteWord = asyncWrapper(
  async ({ params: { id } }: Request, res: Response) => {
    // Clean the input "id" by removing any potential cross-site scripting (XSS) attacks.
    const cleanId: string = cleanXSS(id);

    // Escape any special characters in the cleaned "id".
    const escapedId: string = escapeSpecialCharacters(cleanId);

    // Call the "findAndDeleteWord" function with the escaped "id".
    // This function presumably searches for a word with the given ID and deletes it.
    const data = findAndDeleteWord(escapedId);

    // If no data is found (meaning the word doesn't exist), return an internal server error.
    if (!data)
      return res.status(INTERNAL_SERVER_ERROR).json(internalServerError('word', id));

    // Otherwise, return a success response with a status of "NO_CONTENT".
    return res.status(NO_CONTENT).json(deleteSuccess);
  }
);
