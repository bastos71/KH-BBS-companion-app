<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GameLogo from './assets/bbsfm-logo.png'
import GihtubLogo from './icons/github.vue'
import DarkModeSwitch from './components/DarkModeSwitch.vue'
</script>

<template>
  <header class="header">
    <img class="header__logo" :src="GameLogo" alt="Kingdom Hearts Birth By Sleep Final Mix" />

    <div class="header__actions">
      <DarkModeSwitch class="header__dark-mode-switch" />

      <a
        href="https://github.com/bastos71/KH-BBS-companion-app"
        target="_blank"
        class="header__github-link"
        title="Bastos71 on github"
      >
        <GihtubLogo class="header__github-logo" />
      </a>
    </div>
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

  &__actions {
    position: fixed;
    z-index: 1;
    right: 1em;
    top: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75em;
  }

  &__dark-mode-switch {
    margin-right: 1em;
  }

  &__github-link {
    display: flex;
    width: 2em;
  }

  &__github-logo {
    fill: var(--bs-body-color);
    width: 2em;
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
