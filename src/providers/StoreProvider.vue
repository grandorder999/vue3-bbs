<script setup lang="ts">
import { provide } from "vue";
import { storeKey, useStore } from "./storeProvider";
provide(storeKey, useStore());
</script>

<template>
  <div><slot /></div>
</template>

<style scoped></style>
