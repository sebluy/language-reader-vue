import { Utility } from "@/utility";

export class RawSentence {
  raw: string;
  clean: string;
  sentenceId: number | undefined;

  constructor(raw: string, clean: string) {
    this.raw = raw;
    this.clean = clean;
  }

  getWords(): [string] {
    return this.clean
      .split(/\s+/)
      .map(Utility.cleanWord)
      .filter((v) => v !== "");
  }

  getWordsAndSpaces() {
    return this.raw.split(/(\s+)/);
  }
}
