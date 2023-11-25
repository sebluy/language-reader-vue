import { Word } from "@/word";
import { Utility } from "@/utility";
import { RawSentence } from "@/raw-sentence";
import type { LanguageDb } from "@/language-db";

// TODO: Fix this promise garbage use async, linear

export class LanguageTextPageless {
  filename: string;
  totalWordsTranslated: number;
  db: LanguageDb;
  text: string | undefined;
  sentences: Array<RawSentence>;
  words: Array<Word>;
  wordMap: Map<string, Word>;
  promise: Promise<void>;
  onNewWordLearned: (word: Word) => void;

  constructor(
    db: LanguageDb,
    filename: string,
    text: string,
    onNewWordLearned: () => void
  ) {
    this.db = db;
    this.filename = filename;
    this.text = text;
    this.totalWordsTranslated = 0;
    this.onNewWordLearned = onNewWordLearned;
    this.sentences = [];
    this.words = [];
    this.wordMap = new Map();
    this.promise = new Promise((r) => r());
  }

  async load(): Promise<void> {
    await this.loadSentences();
    await this.loadWords();
  }

  onUpdateDefinition(word: string) {
    return;
  }

  async loadWords() {
    this.wordMap = new Map();
    this.words = [];
    let sentenceIndex = 0;
    for (const rawSentence of this.sentences) {
      const words = rawSentence.getWords();
      for (const word of words) {
        let wordO = this.wordMap.get(word);
        if (wordO === undefined) {
          wordO = await this.db.getWord(word);
        }
        if (wordO === undefined) {
          wordO = new Word(word, rawSentence.sentenceId as number);
        }
        // TODO: this can be removed after migrating DB
        if (wordO.sentenceId === undefined) {
          wordO.sentenceId = rawSentence.sentenceId as number;
        }
        this.words.push(wordO);
        this.wordMap.set(word, wordO);
      }
      // TODO: Fix this inefficiency
      await this.db.putWords([...this.wordMap.values()]);
      sentenceIndex += 1;
    }
  }

  updateWordDefinition(word: string, definition: string) {
    const wordData = this.wordMap.get(word);
    if (wordData === undefined) return;
    if (wordData.definition === definition) return;
    const isNewWord = !wordData.isDefined();
    wordData.setDefinition(definition);
    if (isNewWord) {
      this.totalWordsTranslated += 1;
      this.onNewWordLearned(wordData);
    }
    console.log("Updating definition... for " + word + " to " + definition);
    this.db.putWords([wordData]);
    this.onUpdateDefinition(word);
  }

  async loadSentences() {
    let i = 0;
    this.sentences = [];
    if (this.text === undefined) this.text = "";
    for (;;) {
      const endPos = Utility.nextEndPos(this.text, i);
      const text = this.text.substring(
        i,
        endPos === false ? undefined : endPos + 1
      );
      if (text === "") break;
      const clean = text.trim();
      this.sentences.push(new RawSentence(text, clean));
      if (endPos === false) break;
      i = endPos + 1;
    }
  }

  getDefinitionArray() {
    return this.words.map((v) => v.definition);
  }

}
