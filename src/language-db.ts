import { Sentence } from "@/sentence";
import { Word } from "@/word";
import Dexie from "dexie";
import { Utility } from "@/utility";
import { RuntimeData } from "@/runtime-data";
import { HistoryDay } from "@/history-day";

export class LanguageDb {
  db: any;

  constructor() {
    this.db = new Dexie("LanguageDB");
    this.db.version(3).stores({
      words: "word, mastery",
      sentences: "++id, sentence",
      history: "date",
      other: "key",
    });
    this.db.words.mapToClass(Word);
    this.db.sentences.mapToClass(Sentence);
    this.db.history.mapToClass(HistoryDay);
  }

  getWord(word: string): Promise<Word> {
    return this.db.words.get(word);
  }

  getSentence(sentence: string): Promise<Sentence> {
    return this.db.sentences.where("sentence").equals(sentence).first();
  }

  getSentenceById(id: number): Promise<Sentence> {
    return this.db.sentences.get(id);
  }

  putWords(words: Array<Word>) {
    return this.db.words.bulkPut(words);
  }

  putSentence(sentence: Sentence) {
    console.log("Updating sentence", sentence);
    return this.db.sentences.put(sentence);
  }

  async import(db: any) {
    await this.db.words.clear();
    await this.db.sentences.clear();
    await this.db.other.delete("runtimeData");

    console.log("importing words");
    await this.putWords(db.words);
    console.log("done importing words");
    console.log("importing sentences");
    await this.db.sentences.bulkPut(db.sentences);
    console.log("done importing sentences");
    await this.db.other.put({ key: "runtimeData", value: db.runtimeData });
    console.log("done import");
    return "done";
  }

  async export() {
    const words = await this.db.words.toArray();
    const sentences = await this.db.sentences.toArray();
    const runtimeData = await this.getRuntimeData();
    return { runtimeData, sentences, words };
  }

  getRuntimeData(): Promise<RuntimeData> {
    return this.db.other.get("runtimeData").then((data: any) => {
      if (data === undefined) return new RuntimeData();
      return RuntimeData.fromObject(data.value);
    });
  }

  putRuntimeData(runtimeData: RuntimeData) {
    console.log("Saving runtime data", runtimeData);
    this.db.other.put({ key: "runtimeData", value: runtimeData });
  }

  getTextFile() {
    return this.db.other
      .get("textFile")
      .then((row: any) => (row === undefined ? undefined : row.value));
  }

  putTextFile(text: string) {
    this.db.other.put({ key: "textFile", value: text });
  }

  getAudioFile() {
    return this.db.other
      .get("audioFile")
      .then((row: any) => (row === undefined ? undefined : row.value));
  }

  putAudioFile(file: File) {
    this.db.other.put({ key: "audioFile", value: file });
  }

  async getSentencesForWords(words: Word[]): Promise<Map<number, Sentence>> {
    const sentences = await this.db.sentences.bulkGet(
      words.map((w: Word) => w.sentenceId)
    );
    return new Map(sentences.map((s: Sentence) => [s.id, s]));
  }

  async getPracticeByType(type: number): Promise<Word[]> {
    const w1 = await this.db.words
      .where("mastery")
      .notEqual(Word.FULL_MASTERY)
      .toArray();
    const w2 = w1.filter(
      (word: Word) => word.isDefined() && !word.hasMastery(type)
    );
    Utility.shuffle(w2);
    return w2;
  }

  async getMasteryCounts() {
    const words = await this.db.words
      .where("mastery")
      .notEqual(Word.FULL_MASTERY)
      .toArray();
    const counts: any = {};
    const levels = Object.values(Word.MASTERY_LEVELS);
    levels.forEach((type: number) => {
      counts[type] = 0;
    });
    words.forEach((word: Word) => {
      levels.forEach((type: number) => {
        if (word.isDefined() && !word.hasMastery(type)) counts[type] += 1;
      });
    });
    return counts;
  }

  async getAllWords(): Promise<Word[]> {
    return await this.db.words.toArray();
  }

  async getDefinedSentences(): Promise<Sentence[]> {
    return (await this.db.sentences.toArray()).filter(
      (s: Sentence) => s.definition !== ""
    );
  }

  async getHistory(): Promise<HistoryDay[]> {
    return await this.db.history.toArray();
  }

  async putHistoryDay(day: HistoryDay): Promise<number> {
    return this.db.history.put(day);
  }

  async getStatistics(date: string | undefined = undefined): Promise<HistoryDay> {
    const words = await db.getAllWords();
    if (date === undefined) date = new Date().toLocaleDateString();
    const stats = new HistoryDay(date, 0, 0, 0);
    words.forEach((word) => {
      if (word.isDefined()) stats.defined += 1;
      if (word.isMastered()) stats.mastered += 1;
      stats.learned += word.getMasteryPercentage();
    });

    return stats;
  }

  async getLastStatistics(): Promise<HistoryDay> {
    return this.db.history.toCollection().last();
  }
}

const db = new LanguageDb();
export const useLanguageDB = () => db;
