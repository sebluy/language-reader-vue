<script setup>
import { computed } from "vue";

const props = defineProps(["tag"]);
let cTag = computed(() => (props.tag ? props.tag : "input"));
</script>

<template>
  <div id="props.id">
    <span>...</span>
    <component :is="cTag" type="text" placeholder="Definition" />
    <button>Google Translate</button>
  </div>
</template>
