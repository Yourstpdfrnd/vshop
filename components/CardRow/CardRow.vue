<template>
    <div class="card-row">
       <div class="card-row__item" v-for="(product, i) in items" :key="i">
            <img class="card-row__item-image" :src="product.image" alt="">
            <div class="card-row__item-info">
                <div class="card-row__item-name">{{ product.name }}</div>
                <div class="card-row__item-description">{{ product.description }}</div>
                <div class="card-row__item-price">Цена: <span>{{ product.price }} ₽</span></div>
                <div class="card-row__item-btns">
                    <AButton class="card-row__item-cart" label="В корзину" @click="cartStore.add(product.id)"/>
                    <AButton class="card-row__item-fav" color="secondary" label="В избранное" @click="favoriteStore.add(product.id)"/>
                </div>
            </div>
        </div> 
    </div>
</template>

<script setup>
import { useCartStore } from '../../stores/cart.js';
import { useFavoriteStore } from '../../stores/favorite.js'
import AButton from '../_ui/AButton/AButton.vue';
import './CardRow.scss';

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
const props = defineProps({
   items: Array 
})
</script>

<style lang="scss" scoped>

</style>