<template>
    <label class="form__label">
        <span class="form__value">{{ title }}</span>
        <slot />
        <span class="form__error" v-if="error">{{ error }} </span>
    </label>
</template>

<script setup>

import './AFormField.scss';

const props = defineProps ({
    title: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
})
</script>