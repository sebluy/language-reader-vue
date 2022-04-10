import { Utility } from "@/utility";

export class RawSentence {
  raw: string;
  clean: string;
  sentenceId: number | undefined;

  constructor(raw: string, clean: string, sentenceId: undefined|number = undefined) {
    this.raw = raw;
    this.clean = clean;
    this.sentenceId = sentenceId;
  }

  getWords(): string[] {
    return this.clean
      .split(/\s+/)
      .map(Utility.cleanWord)
      .filter((v) => v !== "");
  }

  getWordsAndSpaces() {
    return this.raw.split(/(\s+)/);
  }
}
