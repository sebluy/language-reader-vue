<script setup lang="ts">
defineProps(["title", "subtitle"]);
</script>

<template>
  <div id="main">
    <h2>{{ title }}</h2>
    <h3>{{ subtitle }}</h3>
    <slot name="activity"></slot>
  </div>
  <slot name="sidebar"></slot>
</template>
