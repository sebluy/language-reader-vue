import type { Word } from "@/word";

export class Utility {
  static randomWordsByMastery(words: Word[], n: number) {
    const values = Array.from(words.values()).filter(
      (v) => v.definition !== ""
    );
    if (values.length < n) return [];
    const mastery = values.map((v) => v.mastery);
    let minimum = Math.min(...mastery);

    let random: Word[] = [];
    while (random.length < n) {
      const pool = values.filter((v) => v.mastery === minimum);
      Utility.shuffle(pool);
      random = random.concat(pool.slice(0, n - random.length));
      minimum += 1;
    }
    return random;
  }

  static cleanWord(word: string) {
    const match = word.match(/\p{Letter}+/u);
    if (match) return match[0].toLowerCase();
    return "";
  }

  static shuffle(a: unknown[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [a[i], a[r]] = [a[r], a[i]];
    }
  }

  static randomItem(a: unknown[]) {
    const index = Math.floor(Math.random() * a.length);
    return a[index];
  }

  static createHTML(a: any) {
    const [tag, ...rest] = a;
    const element = document.createElement(tag);
    for (const i in rest) {
      const item = rest[i];
      if (Array.isArray(item)) {
        element.append(this.createHTML(item));
      } else if (
        typeof item === "string" ||
        typeof item === "number" ||
        item instanceof Element
      ) {
        element.append(item);
      } else if (typeof item === "object") {
        for (const prop in item) {
          element[prop] = item[prop];
        }
      }
    }
    return element;
  }

  static isEndChar(char: string) {
    if (char === "...") return false;
    return char.match(/[.?!]/) !== null;
  }

  static nextEndPos(book: string, i: number) {
    for (;;) {
      const char = book.substring(i, i + 1);
      if (book.substring(i, i + 3) === "...") {
        i += 3;
        continue;
      }
      if (char === "") return false;
      const match = this.isEndChar(char);
      if (match) break;
      i += 1;
    }
    for (;;) {
      const char = book.substring(i + 1, i + 2);
      const match = this.isEndChar(char);
      if (!match) break;
      i += 1;
    }
    for (;;) {
      const char = book.substring(i + 1, i + 2);
      const match = char.match(/[\s“]/) !== null;
      if (!match) break;
      i += 1;
    }
    return i;
  }

  static createDraggableItem(props: any) {
    const el = document.createElement(props.tag);
    el.id = props.id;
    el.classList.add("matching-item");
    el.innerText = props.text;
    el.draggable = true;

    el.addEventListener("drop", (e: any) => {
      e.preventDefault();
      const source = document.getElementById(
        e.dataTransfer.getData("text/plain")
      ) as HTMLInputElement;
      const dest = e.target;
      if (dest.draggable === false) return;
      const destHTML = dest.innerHTML;
      dest.innerHTML = source.innerHTML;
      source.innerHTML = destHTML;
      dest.classList.remove("drag-over");
      if (props.onDrop) props.onDrop(source, dest, props);
    });
    el.addEventListener("dragenter", (e: any) => {
      e.preventDefault();
      if (e.target.draggable === false) return;
      e.target.classList.add("drag-over");
    });
    el.addEventListener("dragover", (e: any) => {
      e.preventDefault();
      if (e.target.draggable === false) return;
      e.target.classList.add("drag-over");
    });
    el.addEventListener("dragleave", (e: any) => {
      e.target.classList.remove("drag-over");
    });
    el.addEventListener("dragstart", (e: any) => {
      e.dataTransfer.setData("text/plain", e.target.id);
    });
    return el;
  }

  static benchmark(f: any) {
    const t1 = new Date().getTime();
    f();
    const t2 = new Date().getTime();
    console.log((t2 - t1) / 1000);
  }

  static download(filename: string, text: string) {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  static upload(): Promise<FileList> {
    const element = document.createElement("input");
    element.setAttribute("type", "file");
    element.setAttribute("multiple", "");
    element.style.display = "none";
    document.body.appendChild(element);
    return new Promise((resolve) => {
      element.addEventListener("change", () => {
        resolve(element.files || new FileList());
        element.remove();
      });
      element.click();
    });
  }

  static async uploadText() {
    return (await Utility.upload())[0];
  }

  static async openFiles() {
    const files = await Utility.upload();
    const result: any = {};
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === "text/plain") {
        result.text = file;
      }
      if (file.type === "audio/mpeg" || file.type === "audio/x-m4a") {
        result.audio = file;
      }
    }
    return result;
  }
}
