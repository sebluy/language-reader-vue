export class Word {
  word: string;
  definition: string;
  mastery: number;
  count: number;
  sentenceId: number;

  static MASTERY_LEVELS = {
    DEFINED: 1 << 0,
    VOCAB_IN_CONTEXT: 1 << 1,
    VOCAB_MATCHING: 1 << 2,
    CLOZE: 1 << 3,
    LISTENING1: 1 << 4,
    LISTENING2: 1 << 5,
  };

  static FULL_MASTERY = 0b111111;

  constructor(word: string, sentenceId: number) {
    this.word = word;
    this.sentenceId = sentenceId;
    this.definition = "";
    this.mastery = 0;
    this.count = 1;
  }

  updateMastery(code: number) {
    this.mastery |= code;
    return this;
  }

  hasMastery(code: number) {
    return this.mastery & code;
  }

  getTranslatedCount() {
    return this.isDefined() ? this.count : 0;
  }

  isDefined() {
    return this.mastery & Word.MASTERY_LEVELS.DEFINED;
  }

  setDefinition(definition: string) {
    this.definition = definition;
    this.updateMastery(Word.MASTERY_LEVELS.DEFINED);
  }

  getMasteryPercentage(): number {
    let count = 0;
    for (let i = 1; i <= Word.MASTERY_LEVELS.LISTENING2; i <<= 1) {
      if (i & this.mastery) count += 1;
    }
    return count / Object.keys(Word.MASTERY_LEVELS).length;
  }

  getNewCount() {
    return this.isDefined() ? 1 : 0;
  }
}
