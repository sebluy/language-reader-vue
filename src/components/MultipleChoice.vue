<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { Utility } from "@/utility";

const props = defineProps(["pool", "solution"]);
const emit = defineEmits(["correctAnswer"]);

let keyListener;

const checkAnswer = (option) => {
  if (option === props.solution) emit("correctAnswer");
};

const options = computed(() => {
  const opts = [props.solution];
  for (let i = 0; i < 20; i += 1) {
    let option = Utility.randomItem(props.pool);
    if (opts.indexOf(option) === -1) opts.push(option);
    if (opts.length === 4) break;
  }
  Utility.shuffle(opts);
  return opts;
});

onMounted(() => {
  keyListener = (e) => {
    let input =
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement;
    if (input) return;
    if (["1", "2", "3", "4"].indexOf(e.key) !== -1) {
      e.preventDefault();
      let index = Number.parseInt(e.key) - 1;
      checkAnswer(options.value[index]);
    }
  };
  document.addEventListener("keydown", keyListener);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyListener);
});
</script>

<template>
  <div>
    <button
      v-for="(option, index) in options"
      key="index"
      class="multiple-choice"
      @click="(e) => checkAnswer(option)"
    >
      {{ `${index + 1}. ${option}` }}
    </button>
  </div>
</template>
