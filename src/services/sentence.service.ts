import { Sentence } from "../interfaces/sentence.interface"
import SentenceModel from "../models/sentence.model"

export const findAllSentences = async () => {
  const responseSentence = await SentenceModel.find({})
  return responseSentence
}

export const findOneSentence = async (sentenceID: string) => {
  const responseSentence = await SentenceModel.findById({ _id: sentenceID })
  return responseSentence
}

export const createSentence = async (data: Sentence) => {
  const responseSentence = await SentenceModel.create(data)
  return responseSentence
}

export const findAndUpdateSentence = async (sentenceID: string, data: Sentence) => {
  const responseSentence = await SentenceModel.findOneAndUpdate({ _id: sentenceID }, data, { new: true })
  return responseSentence
}

export const findAndDeleteSentence = async (sentenceID: string) => {
  const responseSentence = await SentenceModel.findOneAndDelete({ _id: sentenceID })
  return responseSentence
}