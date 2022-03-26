import type { LanguageText } from "@/language-text";

export default class {
  wordIndex: number|undefined;
  text: () => LanguageText;

  constructor(text: () => LanguageText) {
    this.text = text;
    this.wordIndex = undefined;
  }

  nextSentence() {
    if (this.wordIndex === undefined) return;
    const sentenceIndex = this.text().sentenceIndexByWordIndex;
    const currentSentenceIndex = sentenceIndex[this.wordIndex];
    for (;;) {
      if (this.wordIndex === this.text().words.length - 1) return;
      this.wordIndex += 1;
      const nextSentenceIndex = sentenceIndex[this.wordIndex];
      if (nextSentenceIndex !== currentSentenceIndex) return;
    }
  }

  nextWord() {
    if (this.wordIndex === undefined) return;
    if (this.wordIndex === this.text().words.length - 1) return;
    this.wordIndex += 1;
  }

  selectedWord() {
    if (this.wordIndex === undefined) return {};
    return this.text().words[this.wordIndex];
  }

  selectedSentence() {
    if (this.wordIndex === undefined) return {};
    const sentenceIndex = this.text().sentenceIndexByWordIndex[this.wordIndex];
    const clean = this.text().sentences[sentenceIndex].clean;
    return this.text().sentenceMap.get(clean);
  }

  setIndex(wordIndex: number) {
    this.wordIndex = wordIndex;
  }

  getIndex() {
    return this.wordIndex;
  }
}
