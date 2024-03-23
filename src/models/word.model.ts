import { Schema, model } from 'mongoose';
import { Word } from '../interfaces/word.interface';

const WordSchema = new Schema<Word>({
  en: {
    type: String,
    required: [true, 'MUST_PROVIDE_WORD_EN'],
  },
  es: {
    type: String,
    required: [true, 'MUST_PROVIDE_WORD_ES'],
  },
  sentences: [{
    type: Schema.Types.ObjectId, 
    ref: 'Sentence',
    required: [true, 'MUST_PROVIDE_SENTENCES']
  }]
}, { timestamps: false });

const WordModel = model('Word', WordSchema);

export default WordModel;