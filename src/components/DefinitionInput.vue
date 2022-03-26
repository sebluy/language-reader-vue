<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps(["tag", "text", "focus", "definition", "language"]);
const emit = defineEmits(["next", "definitionUpdate"]);
const cTag = computed(() => (props.tag ? props.tag : "input"));
const definitionInput = ref(null);
const definition = ref(props.definition);

const next = (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    e.target.blur();
    emit("next");
  }
  e.stopPropagation();
};

const googleTranslate = () => {
  const text = props.text;
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
    props.language +
    "&tl=en&dt=t&q=" +
    encodeURI(text);
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      definition.value = res[0].map(([v]) => v).join("");
      definitionInput.value.focus();
    });
};

onMounted(() => {
  if (props.focus) definitionInput.value.focus();
});
</script>

<template>
  <div id="props.id">
    <span>{{ props.text }}</span>
    <component
      :is="cTag"
      ref="definitionInput"
      type="text"
      placeholder="Definition"
      :value="definition"
      @input="(event) => (definition = event.target.value)"
      @blur="emit('definitionUpdate', props.text, definition)"
      @keydown="next"
    />
    <button @click="googleTranslate">Google Translate</button>
  </div>
</template>
