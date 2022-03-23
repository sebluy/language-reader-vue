export class RuntimeData {
  currentPage: number;
  xpToday: number;
  xpLast: number;
  xpDate: string;
  openAudioFile: string|undefined;
  openTextFile: string|undefined;
  wordsLearnedToday: number;
  language: string;

  constructor() {
    this.xpToday = 0;
    this.xpLast = 0;
    this.xpDate = new Date().toLocaleDateString();
    this.currentPage = 0;
    this.wordsLearnedToday = 0;
    this.language = "es";
  }

  static fromObject(o: object) {
    const data = new RuntimeData();
    Object.assign(data, o);
    return data;
  }

  updateForNewDay() {
    if (this.isNewDay()) {
      this.xpLast = this.xpToday;
      this.xpToday = 0;
      this.xpDate = new Date().toLocaleDateString();
      this.wordsLearnedToday = 0;
    }
  }

  isNewDay() {
    return this.xpDate !== new Date().toLocaleDateString();
  }

  openNewTextFile(filename: string) {
    this.openTextFile = filename;
    this.currentPage = 0;
  }

  openNewAudioFile(filename: string) {
    this.openAudioFile = filename;
  }
}
