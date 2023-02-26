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
  <div class="row">
    <template v-if="recipes.length > 0">
      <div class="col-md-6" v-for="recipe in recipes" :key="recipe.apiId">
        <RecipeCard
          :show-perk-tag="showPerkTag"
          :show-material="showMaterial"
          :recipe="recipe"
          :material="material"
        />
      </div>
    </template>
    <div v-else class="col-md-12">
      <div class="card">
        <div class="card-body">
          <p class="card-text">No recipe found</p>
        </div>
      </div>
    </div>
  </div>
</template>
