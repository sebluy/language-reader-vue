<script>
import { h } from "vue";
import { Utility } from "@/utility";

export default {
  props: ["sentences", "wordMap", "selectedWordIndex", "highlighting", "wordClass"],
  emits: ["selectWord"],

  setup(props, ctx) {
    const wordHighlighting = (word) => {
      if (props.wordMap === undefined) return "";
      let wordO = props.wordMap.get(word);
      if (!props.highlighting || !wordO.isDefined())
        return { backgroundColor: "" };
      let hue = (wordO.getMasteryPercentage() * 120).toString(10);
      return { backgroundColor: "hsl(" + hue + ",100%,75%)" };
    };
    return () => {
      console.log("Rendering TextView", props);
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
          if (props.wordClass) {
            classO = { ...classO, ...props.wordClass(word, cWord) };
          }
          let spanProps = {
            key: wi2,
            style: selected ? "" : wordHighlighting(cWord),
            class: classO,
            onClick() {
              ctx.emit("selectWord", wi2);
            },
          };
          return h("span", spanProps, word);
        });
        return h("span", { key: si }, wordSpans);
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
