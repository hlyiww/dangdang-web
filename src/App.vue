<script setup lang="ts">
import getSrc from './utils/resourcesUtil'
</script>

<template>
  <h1>DangDang App</h1>
  <img :src="getSrc('1')" alt="" />
</template>

<style scoped></style>
