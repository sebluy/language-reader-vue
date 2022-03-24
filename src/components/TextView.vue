<script>
import { h } from "vue";
import { Utility } from "@/utility";

export default {
  props: ["languageText", "selectedSentenceIndex", "selectedWordIndex"],
  emits: ["selectWord"],
  setup(props, ctx) {
    return () => {
      console.log("Rendering TextView", props);
      if (props.languageText === undefined) return h("p");
      let sentenceSpans = props.languageText.sentences.map((sentence, si) => {
        let wordsAndSpaces = sentence.getWordsAndSpaces();
        let wi = 0;
        let wordSpans = wordsAndSpaces.map((word) => {
          if (word.trim() === "") return word;
          let cWord = Utility.cleanWord(word);
          if (cWord === "") return word;
          let wi2 = wi;
          wi += 1;
          let selected =
            props.selectedWordIndex === wi2 &&
            props.selectedSentenceIndex === si;
          let spanProps = {
            key: wi2,
            className: selected ? "selected" : "",
            onClick() {
              ctx.emit("selectWord", cWord, wi2, sentence.clean, si);
            },
          };
          return h("span", spanProps, word);
        });
        return h("span", { key: si }, wordSpans);
      });
      return h("p", {}, sentenceSpans);
    };
  },
};
</script>
