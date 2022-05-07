export class RuntimeData {
  currentPage: number;
  openAudioFile: string|undefined;
  openTextFile: string|undefined;
  date: string;
  definedToday: number;
  learnedToday: number;
  masteredToday: number;
  language: string;

  constructor() {
    this.date = new Date().toLocaleDateString();
    this.currentPage = 0;
    this.definedToday = 0;
    this.learnedToday = 0;
    this.masteredToday = 0;
    this.language = "es";
  }

  static fromObject(o: object): RuntimeData {
    const data = new RuntimeData();
    Object.assign(data, o);
    return data;
  }

  load(data: RuntimeData): void {
    Object.assign(this, data);
  }

  updateForNewDay() {
    this.date = new Date().toLocaleDateString();
  }

  isNewDay() {
    return this.date !== new Date().toLocaleDateString();
  }

  openNewTextFile(filename: string) {
    this.openTextFile = filename;
    this.currentPage = 0;
  }

  openNewAudioFile(filename: string) {
    this.openAudioFile = filename;
  }

}

const runtimeData = new RuntimeData();
export const useRuntimeData = () => runtimeData;
