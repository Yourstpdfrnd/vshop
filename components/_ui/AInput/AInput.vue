<template>
  <div class="a-input" :class="classes">
    <label >{{ label }}</label>
    <div class="a-input__container">
      <!-- <textarea v-if="type == 'textarea'" /> -->
      <input
        class="a-input__textfield"
        :class="classesField"
        :type="type"
        :value="modelValue"
        @input="updateInput"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script setup>
import './AInput.scss';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    validator(value) {
      return ['large', 'medium', 'small'].indexOf(value) !== -1;
    },
    default: 'medium',
  },
});

const emit = defineEmits(['update:modelValue']);

const classes = computed(() => ({
  'a-input': true,
  [`a-input--${props.size}`]: true,
}));

const classesField = computed(() => ({
  [`a-input__textfield--${props.size}`]: true,
}));

const updateInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>