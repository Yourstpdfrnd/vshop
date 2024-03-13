<template>
    <button 
    :class="['button', `button_${color}`, {'button_rounded': rounded}, `button_${size}`,]"
    :disabled="disabled"
    @click="clickOnButton">
        <img v-if="icon" :src="icon" alt="" class="button_icon" />
        <span v-if="icon">
            <v-icon>{{ icon }}</v-icon>
        </span>
        <span v-else>{{ label }}</span>
    </button>
</template>

<script setup>
import './AButton.scss';

const props = defineProps({
    label: {
        type: String,
        default: 'Button'
    },
    color: {
        type: String,
        default: 'primary' 
    },
    rounded: {
        type: Boolean,
        required: false
    },
    icon: {
       type: String,
       required: false
    },
    size: {
        type: String,
        default: 'custom' ,
        validator(value) {
            return ['xlarge', 'large', 'medium', 'small', 'custom'].indexOf(value) !== -1;
        },
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    propagation: { 
        type: Boolean, 
        default: false 
    },
})

const emit = defineEmits(['click'])

const clickOnButton = () => {
    emit('click')
}
</script>