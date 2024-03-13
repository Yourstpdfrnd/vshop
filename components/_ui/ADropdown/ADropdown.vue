<template>
  <div class="dropdown-wrapper">
    <div class="dropdown-selected-option" @click="isDropdownVisible = true">
        {{ mappedSelectedOption }}
    </div>
    <div class="options-wrapper" v-if="isDropdownVisible">
        <div class="option" 
        v-for="(option, index) in options"
        :key="index"
        @click="toggleOptionSelect(option)"
        >
        {{ option.name }}
        </div>
    </div>
  </div> 
</template>

<script setup>

import './ADropdown.scss';

const props = defineProps ({
    options: {
        type: Array,
        required: true
    },
    modelValue: {
        default: null
    }
})

const emit = defineEmits(['update:modelValue'])

const selectedOption = ref(null)

const toggleOptionSelect = (option) => {
    selectedOption.value = option.name;
    emit('update:modelValue', option.name)
    isDropdownVisible.value = false;
}

const mappedSelectedOption = computed (() => {
    return (selectedOption.value?.name || selectedOption.value) || 
    'Выбрать'
    
})


const isDropdownVisible = ref(false)
</script>
