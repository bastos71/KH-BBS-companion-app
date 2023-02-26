<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GameLogo from './assets/bbsfm-logo.png'
</script>

<template>
  <header class="header">
    <img class="header__logo" :src="GameLogo" alt="" />
  </header>

  <div class="container">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <RouterLink class="nav-link kh-button" active-class="kh-button__active" to="/"
          ><span class="kh-button__text">BBS Mix Module</span></RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink
          class="nav-link kh-button"
          active-class="kh-button__active"
          to="/bbs-search-engine"
          ><span class="kh-button__text">BBS Search Engine</span></RouterLink
        >
      </li>
    </ul>

    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;

  &__logo {
    width: 20em;
    max-width: 100%;
  }
}

.nav {
  margin-bottom: 1em;
}

.nav-item {
  margin: 1em;
}
</style>
