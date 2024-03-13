<template>
    <div class="card-modal">
        <div class="card-modal__descr">
            {{ description }}
        </div>
    </div>
</template>

<script setup>
import products from "~~/data";
import './CardModal.scss';

const props = defineProps({
   description: String 
})
</script>

