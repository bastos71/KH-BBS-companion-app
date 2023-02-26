<script setup lang="ts">
import RecipeCard from './RecipeCard.vue'

import { useBBSStore } from '@/stores/bbs'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type Command from '@/types/Command'
import type Material from '@/types/Material'
import type Recipe from '@/types/Recipe'

const bbsStore = useBBSStore()

const commands = bbsStore.commands
const materials = bbsStore.materials
const recipes = bbsStore.recipes

let firstIngredient: Ref<Command | null> = ref(null)
let secondIngredient: Ref<Command | null> = ref(null)
let material: Ref<Material | null> = ref(null)

let matches: Ref<Recipe[]> = ref([])

watch(firstIngredient, searchRecipe)
watch(secondIngredient, searchRecipe)

function searchRecipe() {
  matches.value = recipes.filter((recipe: Recipe) => {
    const firstIngredientId = firstIngredient.value?.apiId
    const secondIngredientId = secondIngredient.value?.apiId

    if (firstIngredientId && secondIngredientId) {
      return (
        (recipe.firstIngredientId === firstIngredientId &&
          recipe.secondIngredientId === secondIngredientId) ||
        (recipe.secondIngredientId === firstIngredientId &&
          recipe.firstIngredientId === secondIngredientId)
      )
    }

    const singleIngredient = firstIngredientId ?? secondIngredientId
    if (singleIngredient) {
      return (
        recipe.firstIngredientId === firstIngredientId ||
        recipe.secondIngredientId === secondIngredientId
      )
    }

    return false
  })
}
</script>

<template>
  <div>
    <form>
      <div class="mb-3">
        <label class="form-label">First Ingredient</label>
        <select v-model="firstIngredient" id="first_ingredient" class="form-select">
          <option :value="null">Please select an option</option>
          <option v-for="command in commands" :key="command.apiId" :value="command">
            {{ command.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Second Ingredient</label>
        <select v-model="secondIngredient" id="second_ingredient" class="form-select">
          <option :value="null">Please select an option</option>
          <option v-for="command in commands" :key="command.apiId" :value="command">
            {{ command.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Material</label>
        <select v-model="material" id="second_ingredient" class="form-select">
          <option :value="null">Please select an option</option>
          <option v-for="material in materials" :key="material.apiId" :value="material">
            {{ material.name }}
          </option>
        </select>
      </div>
    </form>

    <template v-if="matches.length > 0">
      <RecipeCard
        :recipe="match"
        :material="material"
        v-for="match in matches"
        :key="match.apiId"
      />
    </template>
    <div v-else class="card">
      <div class="card-body">
        <p class="card-text">No recipe found</p>
      </div>
    </div>
  </div>
</template>
