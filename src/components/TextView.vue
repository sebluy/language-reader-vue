<script>
import { h } from "vue";
import { Utility } from "@/utility";
import { Word } from "@/word";

export default {
  props: ["languageText", "selectedWordIndex", "page", "highlighting"],
  emits: ["selectWord"],
  setup(props, ctx) {
    const wordHighlighting = (word) => {
      let wordO = props.languageText.wordMap.get(word);
      if (!props.highlighting || wordO.definition === "")
        return { backgroundColor: "" };
      let hue = ((wordO.mastery / Word.MAX_MASTERY) * 120).toString(10);
      return { backgroundColor: "hsl(" + hue + ",100%,75%)" };
    };
    return () => {
      console.log("Rendering TextView", props);
      let wi = 0;
      if (props.languageText === undefined) return h("p");
      let sentenceSpans = props.languageText.sentences.map((sentence, si) => {
        let wordsAndSpaces = sentence.getWordsAndSpaces();
        let wordSpans = wordsAndSpaces.map((word) => {
          if (word.trim() === "") return word;
          let cWord = Utility.cleanWord(word);
          if (cWord === "") return word;
          let wi2 = wi;
          wi += 1;
          let spanProps = {
            key: wi2,
            style: wordHighlighting(cWord),
            className: props.selectedWordIndex === wi2 ? "selected" : "",
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
