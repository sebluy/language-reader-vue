<script setup>
import {computed, onMounted, ref} from "vue";

const props = defineProps(["tag", "text", "focus"]);
const emit = defineEmits(["next"]);
const cTag = computed(() => (props.tag ? props.tag : "input"));
const definition = ref(null);

const next = (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    e.target.blur();
    emit("next");
  }
  e.stopPropagation();
};

onMounted(() => {
  if (props.focus) definition.value.focus();
});
</script>

<template>
  <div id="props.id">
    <span>{{ props.text }}</span>
    <component
      :is="cTag"
      ref="definition"
      type="text"
      placeholder="Definition"
      @keydown="next"
    />
    <button>Google Translate</button>
  </div>
</template>
