<template>
  <input
    class="radiobutton"
    type="radio"
    :name="name"
    :id="id"
    :value="value"
    :checked="checked"
    @change="handleClick($event)">
  <label :for="id">{{label}}</label>
</template>

<script setup>

import './ARadio.scss';

const emit = defineEmits(['update:checkedValue'])
const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    name: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    },
    value: {
        type: String,
        default: '' 
    },
    checkedValue: {
        type: String,
        default: '' 
    },
    label: {
        type: String,
        default: '' 
    },
    checked: {
        type: Boolean,
        default: false 
    },
    group: {
        type: Boolean,
        default: false 
    }
})

const handleClick = (event) => {
  emit('update:checkedValue', event.target.value)
}

</script>