<template>
    <div class="container">
      <Header />
      <div class="delivery__container">
        <div class="delivery__top">
          <ABack @click="$router.back()"/>
          <div class="delivery__title">Оформление заказа</div>
        </div>
        <div class="delivery__info">
          <div class="delivery__info-item">
            <div class="delivery__info-title">Выберите способ получения заказа</div>
            <div class="delivery__info-options">
               <div class="delivery__info-title">
                
                </div>
                 <div
                 class="delivery__info-option"
                    v-for="option in deliveryOptions"
                    :key="option.id">
                    <ARadio
                      :value="option.name"
                      :label="option.name"
                      :id="option.id"
                      name="deliveryOption"
                      v-model:checkedValue="selectedDelivery"/>
                  </div>
            
            </div>
           
              <div class="delivery__info-item" v-if="selectedDelivery === 'Доставка'">
                <div class="delivery__info-data">
                  <div class="delivery__info-title">Введите ваши данные</div>
              <AFormText 
                title="ФИО"
                placeholder="Введите ваше полное имя"
                v-model="formData.name"
                >
              </AFormText>
              <AFormText 
                title="Адрес доставки"
                placeholder="Введите ваш адрес"
                v-model="formData.address"
                >
              </AFormText>
              <AFormText 
                title="Телефон"
                type="tel"
                placeholder="Введите ваш телефон"
                v-model="formData.phone"
                >
              </AFormText>
                </div>
              
              <div class="delivery__info-title">Выберите удобное для вас время</div>
                <!-- <ASelect :options="timeOptions"/> -->
                <ADropdown :options="timeOptions" v-model="parentSelectedOption"/>
                <div class="delivery__info-more__order" @click="showModal2 = true">Подробнее</div>
              
              </div> 
          
            <p v-else>
            
            <p class="delivery__info-title">Выберите магазин: {{ shopSelectedOption }}</p>
            <ADropdown :options="shopOptions" v-model="shopSelectedOption"/>
            <div class="delivery__info-title">Выберите удобное для вас время</div>
              <ADropdown :options="timeOptions" v-model="parentSelectedOption"/>
            <div class="delivery__info-more" @click="showModal = true">Подробнее</div>
            </p>
            
          </div>
          <div class="delivery__info-item">
            <div class="delivery__info-title">Выберите способ оплаты</div>
          
            <div class="delivery__info-options">
              <div class="delivery__info-option" 
              v-for="option in paymentOptions" 
              :key="option.id">
                <ARadio 
                  :value="option.name"
                  :label="option.name"
                  :id="option.id"
                  name="paymentOptions"
                  v-model:checkedValue="selectedPayment"
                />
              </div>
            </div>
          </div>

          <div class="delivery__info-item">
            <div class="delivery__info-title">Итого</div>
            <div class="delivery-order">
            <div class="delivery-order__title">Ваш заказ</div>
            <div class="delivery-order__items">
                <div class="delivery-order__image" v-for="item in cartStore.formattedCart" :key="item.id">
                  <img :src="item.image" alt="" class="delivery-order__image">
                </div>
            </div>
            <div class="delivery-order__row">     
                <p>{{ cartStore.productsTotal }} товара на сумму</p>
                <p>{{ cartStore.total }} руб</p>
            </div>
            <div class="delivery-order__row" v-if="selectedDelivery">
              <p>{{selectedDelivery}}</p>
              <p v-if="selectedDelivery === 'Самовывоз'">Бесплатно</p>
              <p v-else>1000 Р</p>
            </div>
            
            <AButton :disabled="isButtonDisabled" class="delivery-order__btn" label="Подтвердить" @click="modal = true"/>
            
          </div>
          </div> 
        </div>

        <AModal :isActive="showModal" @closeModal="showModal = false">
        <template #content>
          <div class="delivery__info-title">УСЛОВИЯ ПОЛУЧЕНИЯ ЗАКАЗА</div> 
          <ul class="delivery__info-list">
            <li v-for="(item, index) in items" :key="index">
              {{item.text}}
            </li>
          </ul>
        </template>
      </AModal>
      <AModal :isActive="showModal2" @closeModal="showModal2 = false">
        <template #content>
          <div class="delivery__info-title">УСЛОВИЯ ПОЛУЧЕНИЯ ЗАКАЗА</div> 
          <ul class="delivery__info-list">
            <li v-for="(item, index) in itemslist" :key="index">
              {{item.text}}
            </li>
          </ul>
        </template>
      </AModal>

      <AModal :isActive="modal" @closeModal="modal = false" :submitButton="condition" @navigateTo="navigateToAnotherPage">
         <template #content>
          <h1>Ваш заказ подтвержден</h1>
          <div class="modal-content" v-if="selectedDelivery === 'Доставка'">
            <div class="modal-content__option">Выбрано: <span> {{selectedDelivery}} </span></div>
            <div class="modal-content__option">Оплата: <span> {{selectedPayment}}</span> </div>
            <div class="modal-content__option">Имя покупателя: <span>{{formData.name}}</span></div>
            <div class="modal-content__option">Адрес доставки: <span>{{ formData.address}}</span></div>
            <div class="modal-content__option">Телефон: <span>{{ formData.phone }}</span></div>
            <div class="modal-content__option">Время доставки:<span> {{ parentSelectedOption }}</span></div>
          </div>
          
          <div class="modal-content" v-if="selectedDelivery === 'Самовывоз'">
            <div class="modal-content__option">Выбрано: <span> {{selectedDelivery}} </span></div>
            <div class="modal-content__option">Магазин: <span> {{shopSelectedOption}}</span> </div>
            <div class="modal-content__option">Оплата: <span> {{selectedPayment}}</span> </div>
            <div class="modal-content__option">Время доставки:<span> {{ parentSelectedOption }}</span></div>
          </div>
        </template>
      </AModal>
       
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart.js';
import { useRouter } from 'vue-router'
import AInput from '../components/_ui/AInput/AInput.vue';
import ARadio from '../components/_ui/ARadio/ARadio.vue';
import AModal from '../components/_ui/AModal/AModal.vue';
import ABack from '../components/_ui/ABack/ABack.vue';
import AFormText from '../components/_ui/AFormText/AFormText.vue';
import ASelect from '../components/_ui/ASelect/ASelect.vue';
import AButton from '../components/_ui/AButton/AButton.vue';
import ADropdown from '../components/_ui/ADropdown/ADropdown.vue';

const cartStore = useCartStore();

const condition = ref(true);

const navigateToAnotherPage = () => {
  router.push('/Thanks');
};

let selectedDelivery = ref('');
const deliveryOptions = ref([
  {name: 'Доставка', id: 'f1'},
  {name: 'Самовывоз', id: 'f2'},
])

let selectedPayment = ref('');
const paymentOptions = ref([
  {name: 'При получении', id: 'f3'},
  {name: 'Банковская карта', id: 'f4'},
  {name: 'Система Быстрых Платежей', id: 'f5'},
])

const timeOptions = ref([
  {name: 'c 10 до 13', value: 'f3'},
  {name: 'c 13 до 17', value: 'f4'},
  {name: 'с 17 до 20', value: 'f5'},
])

const shopOptions = ref([
  {name: 'арбат', value: 'f3'},
  {name: 'кутузовский', value: 'f4'},
  {name: 'китай-город', value: 'f5'},
])

const parentSelectedOption = ref(null)
const shopSelectedOption = ref(null)

const handlerFunction = (newValue) => {
  console.log("newValue:", newValue);
};

const items = ref([
  {text: 'Курьеры интернет-магазина доставляют заказы ежедневно в удобное для вас время' },
  {text: 'Бесплатная доставка при покупке от 20 000 ₽' },
  {text: 'Заказ можно оплатить после примерки' },
])

const itemslist = ref([
  {text: 'Курьеры интернет-магазина доставляют заказы ежедневно в 3-х часовой интервал' },
  {text: 'Вы можете примерить вещи и оплатить только те, которые вам подошли' },
  {text: 'Бесплатная доставка при покупке от 20 000 ₽' },
  {text: 'Заказ можно оплатить наличными, банковской, бонусной и подарочной картами' },
])


const showModal = ref(false)
const showModal2 = ref(false)
const modal = ref(false)

const formData = ref({
  name: '',
  address: '',
  phone: ''
});

const isButtonDisabled = computed(() => {
  const { name, address, phone } = formData.value;
  const isVariant1Disabled =
    !name ||
    !address ||
    !phone ||
    !timeOptions.value ||
    timeOptions.value.length === 0 ||
    !selectedPayment.value;

  const isVariant2Disabled =
    !timeOptions.value ||
    timeOptions.value.length === 0 ||
    !selectedPayment.value ||
    !shopOptions.value ||
    shopOptions.value.length === 0;

  return isVariant1Disabled && isVariant2Disabled;
});


const router = useRouter();

const navigateTo = () => {
  router.push('/catalog'); // Replace "/another-page" with your desired destination path
};

</script>

<style lang="scss">

.delivery {
  &__top {
    display: flex;
    align-items: center;
    border-bottom: 0.5px solid var(--color_light);
    padding: 20px 0;
    letter-spacing: 1.8px;
    margin-bottom: 40px;
  }

  &__back {
    font-size: 18px;
    transition: all ease-in .2s;
    &:hover {
      color: var(--color_orange);
    }
  }

  &__title {
    font-size: 25px;
    text-transform: uppercase;
    margin: auto;
  }

  &__info {
    
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    @media all and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 12px;
    }
    @media all and (max-width: 992px) {
      grid-template-columns: repeat(1, 1fr);
    }

    &-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    &-option {
      padding: 12px 0;  
    }

    &-list {
      padding: 0 12px;
    }

    &-more {
      font-size: 12px;
      line-height: 1.5;
      text-decoration: underline;
      color: var(--color_orange);
      cursor: pointer; 
      
      &__order {
        padding-top: 12px;
        font-size: 12px;
        line-height: 1.5;
        text-decoration: underline;
        color: var(--color_orange);
        cursor: pointer; 
        text-align: center;
      }
    }

    &-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }

    &-data {
      margin-bottom: 20px;
    }
  }

  &-order {
    background-color: var(--grey_light);
    padding: 24px;
    border-radius: 20px;
    &__title {
        font-size: 24px;
        margin-bottom: 12px;
    }

    &__row {
      display: flex;
      justify-content: space-between;
    }

    &__items {
        display: grid;
        grid-template-columns: repeat(6,1fr);
        grid-gap: 10px;
    }

    &__image {
        max-height: 85px;
    }

    &__btn {
      margin-top: 40px;
      margin-left: auto;
    }
  }

  
}


.cart__data {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-gap: 5px 30px;
  padding-bottom: 25px;
  margin-bottom: 15px;
}

.cart__data label:not(:nth-child(4)):not(:nth-child(3)) {
  grid-column: 1/-1;
}


</style>