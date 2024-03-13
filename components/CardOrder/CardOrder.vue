<template>
    <div class="card-order">
        <div class="card-order__content">
          <div class="card-order__title">Заказ</div> 


          <div class="card-order__row">
            <div class="card-order__row-text">Количество</div>
            <div class="card-order__row-count">{{ cartStore.productsTotal }} шт</div>
          </div>
          
          <div class="card-order__row">
            <div class="card-order__row-text">Стоимость</div>
            <div class="card-order__row-count">{{ cartStore.total }} RUB</div>
          </div>
          
          <nuxt-link :to="('/delivery')">
            <AButton class="card-order__btn" color="secondary" label="К оформлению"/>
          </nuxt-link> 
        </div>   
    </div>
</template>

<script setup>
import { useCartStore } from '../../stores/cart';
import AButton from '../_ui/AButton/AButton.vue';
import './CardOrder.scss';

const cartStore = useCartStore();
</script>

<style lang="scss" scoped>

</style>