<script setup lang="ts">
import RecipeCard from './RecipeCard.vue'

// @ts-ignore
import type { Material, Recipe } from '@/types'

withDefaults(
  defineProps<{
    recipes: Recipe[]
    material?: Material
    showPerkTag?: boolean
    showMaterial?: boolean
  }>(),
  {
    showPerkTag: true,
    showMaterial: true
  }
)
</script>

<template>
  <div>
    <template v-if="recipes.length > 0">
      <RecipeCard
        :show-perk-tag="showPerkTag"
        :show-material="showMaterial"
        :recipe="recipe"
        :material="material"
        v-for="recipe in recipes"
        :key="recipe.apiId"
      />
    </template>
    <div v-else class="card">
      <div class="card-body">
        <p class="card-text">No recipe found</p>
      </div>
    </div>
  </div>
</template>
