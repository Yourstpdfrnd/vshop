<template>
    <div class="card__content">
        <img class="card__image" :src="product.image" :alt="product.name">
        <div class="card__name">{{ product.name }}</div>
        <div class="card__price">Цена: <span>{{ product.price }} ₽</span></div>
        <div class="card__row">
           <!-- <nuxt-link> Подробнее</nuxt-link> -->
            <div class="card__row-btns">
                <AButton class="card__row-cart" label="В корзину" @click="cartStore.add(product.id)"/>
                <AButton class="card__row-fav" color="secondary" label="В избранное" @click="favoriteStore.add(product.id)"/>
            </div>
        </div>
    </div>
   
</template>

<script setup>

import data from "../../data";
import { useCartStore } from '../../stores/cart.js';
import { useFavoriteStore } from '../../stores/favorite.js'
import AButton from '../_ui/AButton/AButton.vue';
import AModal from '../_ui/AModal/AModal.vue';
import './Card.scss';

import { useRouter } from 'vue-router';
const { product } = defineProps(['product'])

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();

const showModal = ref(false)

</script>