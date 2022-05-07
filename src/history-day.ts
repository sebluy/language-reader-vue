export class HistoryDay {
  date: string;
  defined: number;
  learned: number;
  mastered: number;

  constructor(
    date: string,
    defined: number,
    learned: number,
    mastered: number
  ) {
    this.date = date;
    this.defined = defined;
    this.learned = learned;
    this.mastered = mastered;
  }
}
