
    <template>
      <div class="header">
        <div class="header__wrapper">
          <div  class="header__logo">
            <nuxt-link :to="('/')">
                LUX-WEBSITE
            </nuxt-link>
          </div>
            <div class="header__icons">
              <div class="header__cart">
                <nuxt-link :to="('/cart')">
                  <AButton class="header__icon" icon="mdi-cart-outline" color="black"></AButton>
                  <v-badge :content="cartStore.productsTotal" color="black"></v-badge>
                </nuxt-link>
              </div>
              <div class="header__favorite">
                <nuxt-link :to="('/favorite')">
                  <AButton class="header__favorite" icon="mdi-cards-heart-outline" color="black"></AButton>
                  <v-badge :content="favoriteStore.productsTotal" color="red"></v-badge>
                </nuxt-link>
              </div>
            </div>
        </div>
      </div>
   
</template>
  

<script setup>
import './Header.scss';
import AButton from '../_ui/AButton/AButton.vue';
import { useCartStore } from '../../stores/cart';
import { useFavoriteStore } from  '../../stores/favorite';
const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
</script>

<style lang="scss" scoped>

.header__wrapper {
  padding-bottom: 12px;
  border-bottom: 0.5px solid var(--color_light);
}
</style>