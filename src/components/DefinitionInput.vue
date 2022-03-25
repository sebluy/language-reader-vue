<script setup>
import {computed, onMounted, ref} from "vue";

const props = defineProps(["tag", "text", "focus", "definition"]);
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
    <button>Google Translate</button>
  </div>
</template>
