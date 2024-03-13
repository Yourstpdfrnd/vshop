<template>
   <AFormField :title="title" :error="error"> 
        <input
        class="form__input"
        :type="type"
        :placeholder="placeholder"
        v-model="dataValue"
        />
   </AFormField>
</template>

<script setup>
import './AFormText.scss';
import AFormField from '../AFormField/AFormField.vue'; 

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    title: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
});

const dataValue = computed({
    get() {
    return props.modelValue;
    },
    set(value) {
    emit("update:modelValue", value);
    },
});

  
</script>