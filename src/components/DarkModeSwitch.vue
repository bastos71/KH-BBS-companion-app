<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

let darkModeEnabled: Ref<boolean> = ref(true)

watch(darkModeEnabled, () => {
  ;(document.getElementsByTagName('html')[0] as Element).setAttribute(
    'data-bs-theme',
    darkModeEnabled.value ? 'dark' : 'light'
  )
})
</script>

<template>
  <div class="dark-mode-switch">
    <label for="dark-mode-switch">Light</label>
    <div class="form-check form-switch dark-mode-switch__input-wrapper">
      <input
        class="form-check-input dark-mode-switch__input"
        v-model="darkModeEnabled"
        :checked="darkModeEnabled"
        type="checkbox"
        role="switch"
        id="dark-mode-switch"
      />
    </div>
    <label for="dark-mode-switch">Dark</label>
  </div>
</template>

<style scoped lang="scss">
.dark-mode-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__input {
    margin-top: -0.25em;
  }

  &__input-wrapper {
    display: flex;
    align-items: center;
    margin-left: 0.5em;
    margin-bottom: 0;
  }
}
</style>
