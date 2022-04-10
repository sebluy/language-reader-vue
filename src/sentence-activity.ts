import { LanguageDb } from "@/language-db";
import { Sentence } from "@/sentence";
import { RawSentence } from "@/raw-sentence";
import { Word } from "@/word";

export default class {
  practiceWords: Word[];
  wordIndex: number;
  sentences: Map<number, Sentence>;
  wordPool: Word[];
  db: LanguageDb;
  done: () => void;

  constructor(db: LanguageDb, done: () => void) {
    this.db = db;
    this.practiceWords = [];
    this.wordIndex = 0;
    this.sentences = new Map();
    this.wordPool = [];
    this.done = done;
  }

  word(): Word | undefined {
    return this.practiceWords[this.wordIndex];
  }

  sentence(): Sentence | undefined {
    const word = this.word();
    if (word === undefined) return undefined;
    return this.sentences.get(word.sentenceId);
  }

  rawSentences() {
    const sentence = this.sentence();
    if (sentence === undefined) return [];
    return [
      new RawSentence(
        sentence.sentence,
        sentence.sentence,
        sentence.id as number
      ),
    ];
  }

  correctAnswer() {
    this.wordIndex += 1;
    if (this.wordIndex === this.practiceWords.length) this.done();
  }

  async load() {
    const practiceWords = await this.db.getPracticeByType(
      Word.MASTERY_LEVELS.VOCAB_IN_CONTEXT
    );
    const sentences = await this.db.getSentencesForWords(practiceWords);
    const wordPool = await this.db.getAllWords();
    this.practiceWords = practiceWords;
    this.sentences = sentences;
    this.wordPool = wordPool;
    console.log(this.wordPool);
  }
}
