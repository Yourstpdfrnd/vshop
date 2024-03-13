<template>
  <div class="container">
    <Header />
    <div class="cart__top" v-if="cartStore.formattedCart.length">
      <ABack @click="$router.back()"/>
      <div class="cart__title">Корзина</div>
    </div>
    
    <div class="cart__container"> 
      <div class="cart__box" v-if="cartStore.formattedCart.length">
        <CardTemplate :products="cartStore.formattedCart">
          <template #template>
            <div v-for="item in cartStore.formattedCart" :key="item.id" class="card-template__item">
                  <div class="card-template__row">
                    <div class="card-template__row-btns">
                      <AButton color="none" label="Удалить из корзины" @click="cartStore.remove(item.id)"></AButton>
                    </div>
                    <div class="card-template__row-content">
                      <div class="card-template__row-left">
                      <img :src="item.image" alt="" class="card-template__row-image">
                      <div class="card-template__row-info">
                        <div class="card-template__row-title">{{ item.name }}</div>
                        <div class="card-template__row-option">{{ item.option }}</div>
                      </div>
                    </div>
                      
                      <div class="card-template__row-counter">
                       <AButton color="none" size="custom" icon="mdi-minus" @click="cartStore.remove(item.id)"></AButton>
                        <span class="card-template__row-count">
                        {{ item.quantity }}
                        </span>
                        <AButton :disabled="item.quantity>7" color="none" size="custom"  icon="mdi-plus" @click="cartStore.add(item.id)"></AButton>
                      </div>
                      
                      <div class="card-template__row-total">    
                        <span> {{ item.quantity }}
                      * {{ item.price }} =</span>
                          <strong>
                            {{ item.cost }} ₽
                          </strong>
                      </div>
                    </div>
                  </div>
                  <p class="card-template__notify" v-if="item.quantity>7">добавлено максимальное количество</p>
            </div>
           
          </template>
          
        </CardTemplate>
      </div>
      <div class="cart__empty" v-else>
        <div class="cart__empty-title">Ваша корзина пока что пуста</div>
        <AButton label="На главную" @click="$router.push('/')"></AButton>
        <AButton label="В каталог" @click="$router.push('/catalog')"></AButton>
      </div>
      <div class="cart__order" v-if="cartStore.total">
        <CardOrder />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js';
import AButton from '../components/_ui/AButton/AButton.vue';
import ABack from '../components/_ui/ABack/ABack.vue';
import CardOrder from '../components/CardOrder/CardOrder.vue';

const cartStore = useCartStore();

const count = ref(8)

const isButtonDisabled = computed(()=> {
  return count.value > 8;
})

</script>

<style lang="scss" scoped>
.cart__top {
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid var(--color_light);
  padding: 20px 0;
  letter-spacing: 1.8px;
  margin-bottom: 40px;
}

.cart__title {
   font-size: 25px;
    text-transform: uppercase;
    margin: auto;
}

.cart__box {
  min-width: 750px;
  height: fit-content;
  @media (max-width: 1199px) {
    min-width: auto;
    @media (max-width: 991px) {
    margin-bottom: 30px;
  }
  }
}

.cart__order {
  padding: 20px 16px;
  min-width: 300px;
  border-radius: 4px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  height: fit-content;
}
.cart__container {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  @media (max-width: 991px) {
    flex-direction: column;
  }
}

.cart__empty {
  margin: auto;
  &-title {
    font-size: 26px;
    margin-bottom: 14px;
  }
  button {
    justify-content: center;
    min-width: 210px;
    margin: 8px auto;
  }
}

</style>
