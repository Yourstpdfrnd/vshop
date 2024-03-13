<template>
  <select class="a-select" v-model="currentValue" @change="changeOption">
    <option class="a-select__option" v-for="option in options" :key="option.value" :value="option.value">
        {{ option.name }}
    </option>
  </select>   
</template>

<script setup>

import './ASelect.scss';

let currentValue = ref(props.modelValue)
const props = defineProps({
    modelValue: {
        type: String
    },
    options: {
        type: Array,
        default: () => []
    }
})

const changeOption = (event) => {
    emit('update:modelValue', event.target.value);
    currentValue.value = event.target.value;
};


</script>