import { Schema, model } from 'mongoose';
import { Sentence } from '../interfaces/sentence.interface';

export const SenteceSchema = new Schema<Sentence>({
  en: {
    type: String,
    required: [true, 'MUST_PROVIDE_SENTENCE_EN']
  },
  es: {
    type: String,
    required: [true, 'MUST_PROVIDE_SENTENCE_ES']
  }
},
{ timestamps: false });

const SentenceModel = model('Sentence', SenteceSchema);
export default SentenceModel;