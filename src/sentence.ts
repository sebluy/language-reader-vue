export class Sentence {
  sentence: string;
  definition: string;
  mastery: number;
  startTime: number | undefined;
  endTime: number | undefined;

  constructor(sentence: string, definition = "") {
    this.sentence = sentence;
    this.definition = definition;
    this.mastery = 0;
  }

  getRawWords() {
    return this.sentence.split(/\s+/).filter((v) => v !== "");
  }
}
