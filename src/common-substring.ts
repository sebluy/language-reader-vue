export class CommonSubstring {
  index: Map<string, Array<string>>;
  minimumLength: number;
  maximumResults: number;
  constructor(minimumLength: number, maximumResults: number) {
    this.minimumLength = minimumLength;
    this.maximumResults = maximumResults;
    this.index = new Map();
  }
  addWord(word: string) {
    const ss = this.substrings(word);
    ss.forEach((substring: string) => {
      const matches = this.index.get(substring);
      if (matches === undefined) {
        this.index.set(substring, [word]);
      } else {
        matches.push(word);
      }
    });
  }
  lookup(word: string): Array<string> {
    const ss = this.substrings(word);
    const results: Array<string> = [];
    for (const substring of ss) {
      const matches = this.index.get(substring);
      if (matches === undefined) continue;
      for (const match of matches) {
        if (!results.includes(match)) results.push(match);
        if (results.length === this.maximumResults) return results;
      }
    }
    return results;
  }
  substrings(word: string): Array<string> {
    const result = [];
    // Longest first
    for (let length = word.length; length >= this.minimumLength; length -= 1) {
      for (let start = 0; start <= word.length - length; start += 1) {
        result.push(word.substring(start, start + length));
      }
    }
    return result;
  }
}
