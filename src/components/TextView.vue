<script>
import { h } from "vue";
import { Utility } from "@/utility";

export default {
  props: [
    "sentences",
    "wordMap",
    "selectedWordIndex",
    "selectedSentenceIndex",
    "highlighting",
    "wordOptions",
  ],
  emits: ["selectWord"],

  setup(props, ctx) {
    const wordHighlighting = (word) => {
      if (props.wordMap === undefined) return "";
      let wordO = props.wordMap.get(word);
      if (!props.highlighting || !wordO.isDefined())
        return { backgroundColor: "" };
      return {
        backgroundColor: "hsl(120,100%,75%)",
      };
    };
    return () => {
      let wi = 0;
      if (props.sentences === undefined) return h("p");
      let sentenceSpans = props.sentences.map((sentence, si) => {
        let wordsAndSpaces = sentence.getWordsAndSpaces();
        let wordSpans = wordsAndSpaces.map((word) => {
          if (word.trim() === "") return word;
          let cWord = Utility.cleanWord(word);
          if (cWord === "") return word;
          let wi2 = wi;
          wi += 1;
          let selected = props.selectedWordIndex === wi2;
          let classO = {
            selected: selected,
          };
          // TODO: Refactor this?
          let content = word;
          if (props.wordOptions) {
            const options = props.wordOptions(word, cWord);
            if (options.bold) classO.bold = true;
            if (options.blank) content = "__________";
          }
          let spanProps = {
            key: wi2,
            style: selected ? "" : wordHighlighting(cWord),
            class: classO,
            onClick() {
              ctx.emit("selectWord", wi2);
            },
          };
          return h("span", spanProps, content);
        });
        const sentenceClass = { selected: props.selectedSentenceIndex === si };
        return h("span", { key: si, class: sentenceClass }, wordSpans);
      });
      return h(
        "p",
        { className: props.highlighting ? "highlight" : "" },
        sentenceSpans
      );
    };
  },
};
</script>
