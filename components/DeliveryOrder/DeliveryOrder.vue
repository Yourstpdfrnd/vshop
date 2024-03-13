<template>
  <div class="delivery-order">
    <div class="delivery-order__title">Ваш заказ</div>
    <div class="delivery-order__items">
        <div class="delivery-order__images" v-for="item in cartStore.formattedCart" :key="item.id">
            <img :src="item.image" alt="" class="delivery-order__image">
        </div>
    </div>
    <div class="delivery-order__top">     
        <p>{{ cartStore.productsTotal }} товара на сумму</p>
        <p>{{ cartStore.total }} руб</p>
    </div>
    <div class="delivery-order__bottom">
       <p>Доставка</p> 
       <p>Бесплатно</p>
    </div>
    <nuxt-link to="/favorite">
      <AButton label="Подтвердить"/>
    </nuxt-link>
  </div>
</template>

<script setup>
import { useCartStore } from '../../stores/cart';
import AButton from '../_ui/AButton/AButton.vue';
import './DeliveryOrder.scss';

const cartStore = useCartStore();
</script>

<style>

</style>