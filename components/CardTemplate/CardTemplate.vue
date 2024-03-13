<template>
    <div class="card-template">
      <div class="card-template__header">
        <span>Товар</span>
        <span>Количество</span>
        <span>Итого</span>
      </div>
      <div class="card-template__item">
        <slot name="template"></slot>
      </div> 
    </div>
</template>

<script setup>
import './CardTemplate.scss';
</script>

<style>

</style>