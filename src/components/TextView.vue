<script>
import { h } from "vue";
import { Utility } from "@/utility";

export default {
  props: ["languageText", "selectedWordIndex"],
  emits: ["selectWord"],
  setup(props, ctx) {
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
            className: props.selectedWordIndex === wi2 ? "selected" : "",
            onClick() {
              ctx.emit("selectWord", wi2);
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
