<template>
    <div class="container">
        <Header />
        <h1 class="catalog-title">Каталог</h1>
        
        <div class="catalog-top">
          <AButton class="catalog-btn" label="На главную" @click="$router.push('/')"></AButton>
          <AInput class="catalog-input br-6" label="Поиск по бренду" v-model="searchQuery"/>
          <div class="catalog-options">
            <label for="sortBy">Сортировать по:</label>
            <select class="select br-6" v-model="selectedSort">
              <option value="name">Имени</option>
              <option value="price">Цене (возрастание)</option>
            </select>
            
          </div>
        </div>
        
        <div class="cards__list" v-if="sortedAndSearch.length">
          <div class="card" v-for="p in visibleItems" :key="p.id">
            <Card :product="p"></Card>
               
          </div>
        </div>
        <p class="cards__list-empty" v-else>Ничего не найдено. Введите другой запрос</p>
        
        <APagination
          :totalItems="sortedAndSearch.length"
          :perPage="itemsPerPage"
          :disabled="isPaginationDisabled"
          @page-change="updateVisibleItems"
        />
    </div>
</template>

<script setup>
import data from "../data";
import { ref, watch, computed } from 'vue';
import { useCartStore } from '../stores/cart.js';
import AButton from '../components/_ui/AButton/AButton.vue';
import AModal from '../components/_ui/AModal/AModal.vue';
import Card from '../components/Card/Card.vue';
import CardRow from '../components/CardRow/CardRow.vue';
import CardModal from '../components/CardModal/CardModal.vue';
import ASelect from '../components/_ui/ASelect/ASelect.vue';
import AInput from '../components/_ui/AInput/AInput.vue';
import APagination from "~~/components/_ui/APagination/APagination.vue";

const cartStore = useCartStore();
const products = ref(data);
const items = ref(data);
const showModal = false;

const options = [
  { id: 1, name: 'По имени', price: 10 },
  { id: 2, name: 'По возрастанию цены', price: 20 },
]

const selectedSort = ref('name');
const searchQuery = ref('')

const sortedProducts = computed(() => {
  if (selectedSort.value === 'name') {
    return [...products.value].sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSort.value === 'price') {
    return [...products.value].sort((a, b) => a.price - b.price);
  }
  return [];
});

const sortedAndSearch = computed(() => {
  return sortedProducts.value.filter(product => product.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const currentPage = ref(1);
const itemsPerPage = ref(6); // Количество элементов на странице

const visibleItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return sortedAndSearch.value.slice(startIndex, endIndex);
});

// Обработчик изменения страницы в компоненте пагинации
const updateVisibleItems = (newPage) => {
  currentPage.value = newPage;
};

const isPaginationDisabled = ref(false);

watch([searchQuery, selectedSort], () => {
  currentPage.value = 1; // Сброс текущей страницы на первую после каждого изменения в поиске или сортировке
});

</script>

<style lang="scss">
.cards__list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }

  &-empty {
    text-align: center;
  }
}

.catalog-top {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 32px 0;
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.catalog-options {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  margin-top: -25px;
  @media (max-width: 767px) {
    margin-top: 0;
  }
}

.catalog-btn {
  height: auto;
  width: 100px;
}

.catalog-input {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  @media (max-width: 767px) {
    margin: 16px 0;
  }
}

.select {
  padding: 8px;
  border: 1px solid var(--color_grey);
  margin-left: 10px;
}

</style>