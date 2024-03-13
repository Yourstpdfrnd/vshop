<template>
  <div class="container">
    <Header />
    <div class="favorite__container">
      <div class="favorite__box" v-if="favoriteStore.formattedFavorite.length">
        <div class="favorite__box-content">
          <div class="favorite__box-title">избранное <span>({{favoriteStore.formattedFavorite.length}})</span></div>
          <div class="favorite__box-list" >
          
            <CardTemplate :products="favoriteStore.formattedFavorite">
              <template #template>
                <div v-for="item in favoriteStore.formattedFavorite" :key="item.id" class="card-template__item">
                  <div class="card-template__row">
                    <div class="card-template__row-btns">
                      <AButton color="none" label="Удалить из избранного" @click="favoriteStore.removeProduct(item.id)"></AButton>
                      <AButton color="none" label="В корзину" @click="cartStore.add(item.id)"></AButton>
                    </div>
                    <div class="card-template__row-content">
                      <div class="card-template__row-left">
                      <img :src="item.image" alt="" class="card-template__row-image">
                      <div class="card-template__row-title">{{ item.name }}</div>
                    </div>
                      <div class="card-template__row-count">
                        {{ item.quantity }}
                      </div>
                      <div class="card-template__row-total">    
        
                        <strong>
                          {{ item.price }} ₽
                        </strong>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <!-- <template #template v-else>Мобильный вариант
              </template> -->
            </CardTemplate>
          </div>
        </div>
      </div>
      <div class="favorite__empty" v-else>
        <div class="favorite__empty-title">На данный момент <br> Вы не добавили ни одного товара в избранное.</div>
        <div class="favorite__empty-btns">
          <AButton label="На главную" @click="$router.push('/')"></AButton>
          <AButton label="В каталог" @click="$router.push('/catalog')"></AButton>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

import { useFavoriteStore } from '../stores/favorite.js';
import { useCartStore } from '~/stores/cart.js';
import AButton from '../components/_ui/AButton/AButton.vue';
const favoriteStore =  useFavoriteStore();
const cartStore = useCartStore();

const count = ref()

onMounted(() => {
  console.log('Компонент монтирован');
  
  // Вы можете здесь выполнять различные действия или запросы к данным
});
  

</script>


<style lang="scss" scoped>

.favorite__container {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
}

.favorite__box {
  margin: auto;
  min-width: 750px;
  border-radius: 4px;
  height: fit-content;
  @media (max-width: 991px) {
    min-width: auto;
  }

  &-title {
    border-bottom: 0.5px solid var(--color_light);
    padding: 0 0 20px 0;
    margin-bottom: 40px;
    text-transform: uppercase;
    font-size: 25px;
    letter-spacing: 1.8px;
    text-align: center;
  }
}

.favorite__empty {
  margin: auto;
  text-align: center;
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