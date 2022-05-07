import { useLanguageDB } from "@/language-db";
import { Sentence } from "@/sentence";
import { RawSentence } from "@/raw-sentence";
import { Word } from "@/word";
import { toRaw } from "vue";
import { useMasteryStore } from "@/stores/mastery-store";
import { useRuntimeData } from "@/runtime-data";

const mastery = useMasteryStore();
const db = useLanguageDB();
const runtimeData = useRuntimeData();

export default class {
  masteryLevel: number;
  practiceWords: Word[];
  wordIndex: number;
  sentences: Map<number, Sentence>;
  wordPool: Word[];
  sentencePool: string[];
  done: () => void;

  constructor(masteryLevel: number, done: () => void) {
    this.masteryLevel = masteryLevel;
    this.practiceWords = [];
    this.wordIndex = 0;
    this.sentences = new Map();
    this.wordPool = [];
    this.sentencePool = [];
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
    const word = this.word() as Word;
    word.updateMastery(this.masteryLevel);
    db.putWords([toRaw(word)]);
    runtimeData.xpToday += 1;
    db.putRuntimeData(runtimeData);
    mastery.decrement(this.masteryLevel);
    this.wordIndex += 1;
    if (this.wordIndex === this.practiceWords.length) this.done();
  }

  async load() {
    const practiceWords = await db.getPracticeByType(this.masteryLevel);
    const sentences = await db.getSentencesForWords(practiceWords);
    const wordPool = await db.getAllWords();
    const sentencePool = (await db.getDefinedSentences()).map(
      (sentence: Sentence) => sentence.definition
    );
    this.practiceWords = practiceWords;
    this.sentences = sentences;
    this.wordPool = wordPool;
    this.sentencePool = sentencePool;
  }
}
