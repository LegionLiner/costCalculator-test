<script setup lang="ts">
import Calculator from './components/Calculator.vue'
</script>

<template>
  <div class="header">
    <h1>Тарифный калькулятор</h1>
  </div>
  <Calculator />
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
}
</style>
