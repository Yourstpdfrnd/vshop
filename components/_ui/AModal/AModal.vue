<template>
    <div class="modal-overlay" v-if="isActive">
        <div class="modal">
            <div class="modal-container">
                <div class="modal-content">
                    <slot name="content"></slot>
                </div>
                <AButton class="modal-button" size="medium" label="Подтвердить" @click="$emit('navigateTo')" v-if="submitButton"></AButton>
                <AButton class="modal-button" size="medium" label="Закрыть" @click="$emit('closeModal')" v-else></AButton>
                
            </div>
        </div>
    </div>   
</template>

<script setup>

import './AModal.scss';
import AButton from '../AButton/AButton.vue';

const props = defineProps({
    isActive: {
        type: Boolean,
    }, 
    submitButton: {
    type: Boolean,
    default: false,
  },
})

</script>