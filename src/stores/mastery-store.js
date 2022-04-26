import { reactive } from "vue";
import {Word} from "../word";

class MasteryStore {
  counts;

  setCounts(counts) {
    this.counts = counts;
  }

  incrementAll() {
    const levels = Object.values(Word.MASTERY_LEVELS);
    levels.forEach((level) => {
      if (level === Word.MASTERY_LEVELS.DEFINED) return;
      this.counts[level] += 1;
    });
  }

  decrement(level) {
    this.counts[level] -= 1;
  }

  getCount(level) {
    return this.counts && this.counts[level];
  }
}

const store = reactive(new MasteryStore());
export const useMasteryStore = () => store;
