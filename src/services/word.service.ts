import { Word } from '../interfaces/word.interface';
import WordModel from '../models/word.model';

export const findAllWords = async (pages: number, wordsLimit: number) => {
  // Calculate the number of documents to skip based on the current page and number of words per page
  const skip = (pages - 1) * wordsLimit;

  // Find all words that match the specified criteria, skipping the appropriate number of documents and limiting the results to the specified number of words
  const responseWords = await WordModel.find().skip(skip).limit(wordsLimit);

  // Return the response words
  return responseWords;
};

export const findOneWord = async (wordID: string) => {
  const responseWord = await WordModel.find({ _id: wordID }).populate('sentences').exec();
  return responseWord;
};

export const createWord = async (data: Word) => {
  const responseWord = await WordModel.create(data);
  return responseWord;
};

export const findAndUpdateWord = async (wordID: string, data: Word) => {
  const responseWord = await WordModel.findByIdAndUpdate({ _id: wordID }, data, { new: true });
  return responseWord;
};

export const findAndDeleteWord = async (wordID: string) => {
  const responseWord = await WordModel.findByIdAndDelete({ _id: wordID });
  return responseWord;
};

