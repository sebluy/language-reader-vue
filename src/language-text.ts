import { Word } from "@/word";
import { Utility } from "@/utility";
import { Sentence } from "@/sentence";
import { RawSentence } from "@/raw-sentence";
import type { LanguageDb } from "@/language-db";

// TODO: extract TextPage class

export class LanguageText {
  filename: string;
  totalWordsTranslated: number;
  db: LanguageDb;
  pages: Array<string>;
  text: string | undefined;
  sentences: Array<RawSentence>;
  sentenceMap: Map<string, Sentence>;
  sentenceIndexByWordIndex: Array<number>;
  words: Array<Word>;
  wordMap: Map<string, Word>;
  promises: Promise<void>[];
  onNewWordLearned: () => void;

  constructor(
    db: LanguageDb,
    filename: string,
    text: string,
    currentPage: number,
    onNewWordLearned: () => void
  ) {
    this.db = db;
    this.filename = filename;
    this.totalWordsTranslated = 0;
    this.pages = this.extractPages(text);
    this.onNewWordLearned = onNewWordLearned;
    this.sentences = [];
    this.sentenceMap = new Map();
    this.words = [];
    this.wordMap = new Map();
    this.sentenceIndexByWordIndex = [];
    this.promises = [];
    this.setPage(currentPage);
  }

  onLoad(): Promise<void[]> {
    return Promise.all(this.promises);
  }

  onUpdateDefinition(word: string) {
    return;
  }

  setPage(n: number): boolean {
    if (n < 0 || n >= this.pages.length) return false;
    this.text = this.pages[n];
    this.promises = [];
    this.extractSentences();
    this.extractWords();
    return true;
  }

  extractPages(text: string) {
    const idealLength = 1000;
    const pages = [];
    let pageStart = 0;
    let lastTab = 0;
    let nextNewline = 0;
    let i = 0;
    for (;;) {
      i++;
      if (i === 1000) break;
      nextNewline = text.indexOf("\n", lastTab + 1);
      if (nextNewline === -1) {
        pages.push(text.substring(pageStart));
        break;
      }
      if (nextNewline - pageStart > idealLength) {
        const diffA = Math.abs(lastTab - pageStart - idealLength);
        const diffB = Math.abs(nextNewline - pageStart - idealLength);
        const pageEnd = diffA < diffB ? lastTab : nextNewline;
        pages.push(text.substring(pageStart, pageEnd));
        pageStart = pageEnd;
      }
      lastTab = nextNewline;
    }
    return pages;
  }

  extractWords() {
    this.wordMap = new Map();
    this.words = [];
    this.sentenceIndexByWordIndex = [];
    this.sentences.forEach((sentence: RawSentence, sentenceIndex) => {
      const words = sentence.getWords();
      words.forEach((word: string) => {
        let wordO = this.wordMap.get(word);
        if (wordO) {
          wordO.count += 1;
        } else {
          wordO = new Word(word);
          this.wordMap.set(word, wordO);
        }
        this.words.push(wordO);
        this.sentenceIndexByWordIndex.push(sentenceIndex);
      });
    });
    this.words.forEach((word) => {
      const promise = this.db.getWord(word.word).then((row: Word) => {
        if (row !== undefined) {
          word.definition = row.definition;
          word.mastery = row.mastery;
        }
      });
      this.promises.push(promise);
    });
    const promise = this.db.getNumberOfWords().then((n: number) => {
      this.totalWordsTranslated = n;
    });
    this.promises.push(promise);
  }

  updateWordDefinition(word: string, definition: string) {
    const wordData = this.wordMap.get(word);
    if (wordData === undefined) return;
    if (wordData.definition === definition) return;
    if (wordData.definition === "") {
      this.totalWordsTranslated += 1;
      this.onNewWordLearned();
    }
    wordData.definition = definition;
    console.log("Updating definition... for " + word + " to " + definition);
    this.db.putWords([wordData]);
    this.onUpdateDefinition(word);
  }

  updateSentenceDefinition(sentence: string, definition: string) {
    const sentenceO = this.sentenceMap.get(sentence);
    if (sentenceO === undefined) return;
    if (sentenceO.definition === definition) return;
    sentenceO.definition = definition;
    console.log("Updating definition... for " + sentence + " to " + definition);
    this.db.putSentence(sentenceO);
  }

  updateMastery(words: [Word]) {
    words = words.map((word) => this.words.get(word).nextMastery());
    this.db.putWords(words);
  }

  updateStats() {
    let countTranslated = 0;
    let wMastered = 0;
    let numberOfWords = 0;
    let newWords = 0;
    this.wordMap.forEach((data) => {
      wMastered += data.mastery;
      numberOfWords += data.count;
      countTranslated += data.getTranslatedCount();
      newWords += data.getNewCount();
    });
    const percentTranslated =
      countTranslated === 0 ? 0 : countTranslated / numberOfWords;
    const percentWMastered = wMastered / (this.wordMap.size * 5);
    return {
      newWords: newWords,
      totalWordsTranslated: this.totalWordsTranslated,
      percentTranslated: percentTranslated,
      percentWordsMastered: percentWMastered,
    };
  }

  extractSentences() {
    let i = 0;
    this.sentences = [];
    this.sentenceMap = new Map();
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
      this.sentenceMap.set(clean, new Sentence(clean));
      if (endPos === false) break;
      i = endPos + 1;
    }
    this.sentenceMap.forEach((sentence) => {
      const promise = this.db
        .getSentence(sentence.sentence)
        .then((row: Sentence) => {
          if (row !== undefined) {
            if (row.definition !== undefined)
              sentence.definition = row.definition;
            sentence.startTime = row.startTime;
            sentence.endTime = row.endTime;
          }
        });
      this.promises.push(promise);
    });
  }

  // getRandomSentenceBlock(n)
  // {
  //     let sentenceIndex = Math.floor(Math.random() * (this.sentences.length - n))
  //     let block = []
  //     for (let i = 0; i < n; i++) {
  //         let sentenceData = this.sentences[sentenceIndex + i]
  //         sentenceData.words = new Map()
  //         let words = sentenceData.sentence.split(/\s+/)
  //         words.forEach((word) => {
  //             word = Utility.cleanWord(word)
  //             if (word === '') return
  //             if (!sentenceData.words.has(word)) {
  //                 sentenceData.words.set(word, this.words.get(word))
  //             }
  //         })
  //         block.push(sentenceData)
  //     }
  //     return block
  // }

  updateSentenceTimes(sentence: Sentence, startTime: Date, endTime: Date) {
    if (startTime !== null) sentence.startTime = startTime;
    if (endTime !== null) sentence.endTime = endTime;
    this.db.putSentence(sentence);
  }

  updateSentence(sentence: Sentence) {
    this.sentenceMap.set(sentence.sentence, sentence);
    this.db.putSentence(sentence);
  }

  getWordMap(words: Array<string>) {
    const map = new Map();
    words.forEach((word) => {
      map.set(word, this.words.get(word));
    });
    return map;
  }

  getWordStrArray() {
    return Array.from(this.words).map((v) => v[1].word);
  }

  getSentenceDefinitionArray() {
    return Array.from(this.sentenceMap).map((v) => v[1].definition);
  }

  getDefinitionArray() {
    return Array.from(this.words).map((v) => v[1].definition);
  }

  leastMasteredWord(rawSentence: RawSentence) {
    const wordMap = this.getWordMap(rawSentence.getWords());
    return Utility.randomWordsByMastery(wordMap, 1)[0];
  }

  leastMastery(): number {
    let min = Word.MAX_MASTERY;
    Array.from(this.words).forEach(([k, v]) => {
      if (v.definition !== "" && v.mastery < min) min = v.mastery;
    });
    return min;
  }
}
