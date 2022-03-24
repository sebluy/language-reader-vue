<script>
import { reactive, h } from "vue";
import { Utility } from "@/utility";

export default {
  props: ["sentences"],
  setup(props) {
    const state = reactive({
      selectedWordIndex: undefined,
      selectedSentenceIndex: undefined,
    });

    const selectWord = (word, wordIndex, sentence, sentenceIndex) => {
      // let wordO = props.languageText.words.get(word);
      // let sentenceO = props.languageText.sentenceMap.get(sentence);
      state.selectedSentenceIndex = sentenceIndex;
      state.selectedWordIndex = wordIndex;
    };

    return () => {
      if (props.sentences === undefined) return h("p");
      let sentenceSpans = props.sentences.map((sentence, si) => {
        let wordsAndSpaces = sentence.getWordsAndSpaces();
        let wi = 0;
        let wordSpans = wordsAndSpaces.map((word) => {
          if (word.trim() === "") return word;
          let cWord = Utility.cleanWord(word);
          if (cWord === "") return word;
          let wi2 = wi;
          wi += 1;
          let selected =
            state.selectedWordIndex === wi2 &&
            state.selectedSentenceIndex === si;
          let spanProps = {
            key: wi2,
            className: selected ? "selected" : "",
            onClick() {
              selectWord(cWord, wi2, sentence.clean, si);
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
