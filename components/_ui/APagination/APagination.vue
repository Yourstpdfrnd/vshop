<template>
  <div class="a-pagination__row">
    <button class="a-pagination__btn"  @click="previousPage" :disabled="currentPage === 1 || disabled">Предыдущая страница</button>
    <span class="a-pagination__span">Страница {{ currentPage }} из {{ totalPages }}</span>
    <button class="a-pagination__btn" @click="nextPage" :disabled="currentPage === totalPages || disabled">Следующая страница</button>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import './APagination.scss';

export default {
  props: {
    totalItems: Number,
    perPage: Number,
    disabled: Boolean
  },
  setup(props, { emit }) {
    const currentPage = ref(1);

    const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage));

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    watch(currentPage, (newVal) => {
      emit('page-change', newVal);
    });

    return {
      currentPage,
      totalPages,
      previousPage,
      nextPage,
    };
  },
};
</script>