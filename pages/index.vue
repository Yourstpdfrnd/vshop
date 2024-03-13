<template>
  <v-app id="app">
    <div class="container">
      <Header />
      <div class="main">
        <div class="main-catalog">
          <nuxt-link to='/catalog'>Перейти в каталог</nuxt-link>
        </div>
      
        <div class="main-banner">
          <img src="~/assets/styles/images/banner.png" alt="">
        </div>
      </div>
    </div>
  </v-app>
</template>


<script setup>


</script>

<style lang="scss" scoped>

.main-catalog {
  padding: 50px 0;
  @media (max-width: 1199px) {
    padding: 25px 0;
  }
  a {
    font-size: 32px;
    transition: all ease-in .1s;
    &:hover {
      color: var(--color_orange);
    }
  }
}

.main-banner {
  img {
    min-width: 360px;
    width: 100%;
  }
}

</style>