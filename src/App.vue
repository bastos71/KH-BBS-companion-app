<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GameLogo from './assets/bbsfm-logo.png'
</script>

<template>
  <header class="header">
    <img class="header__logo" :src="GameLogo" alt="" />
  </header>

  <section class="container">
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
  </section>

  <footer class="footer">
    <div class="footer__inner">
      <p class="m-0">
        Crédits :
        <i
          >sources et données
          <a href="https://www.khdestiny.fr/" target="_blank">Khdestiny.fr</a></i
        >
        |
        <i
          >buttons design by
          <a href="https://codepen.io/erzulu/pen/gdqyGE" target="_blank">Erin Hughes</a></i
        >
      </p>
    </div>
  </footer>
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

.footer {
  margin-top: auto;

  &__inner {
    background: var(--bs-dark-bg-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em;
    font-size: 0.75em;
    text-align: center;
    margin-top: 2em;
  }
}
</style>
