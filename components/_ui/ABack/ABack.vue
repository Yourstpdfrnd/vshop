<template>
  <div class="a-back">
    <nuxt-link :to="to">
      <AButton label="Назад" propagation />
    </nuxt-link>
  </div>
  
</template>

<script setup>
import AButton from '../AButton/AButton.vue';

const props = defineProps({
    to: { default: null },
    label: { type: String, default: () => 'Назад' },
})

</script>