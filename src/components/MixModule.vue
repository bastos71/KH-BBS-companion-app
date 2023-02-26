<script setup lang="ts">
import RecipeList from '@/components/RecipeList.vue'
// @ts-ignore
import { useBBSStore } from '@/stores/bbs'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
// @ts-ignore
import type { Command, Material, Recipe } from '@/types'

const bbsStore = useBBSStore()

const commands = bbsStore.commands
const materials = bbsStore.materials
const recipes = bbsStore.recipes

let firstIngredient: Ref<Command | null> = ref(null)
let secondIngredient: Ref<Command | null> = ref(null)
let material: Ref<Material | null> = ref(null)

let matches: Ref<Recipe[]> = ref([])

watch(firstIngredient, searchRecipes)
watch(secondIngredient, searchRecipes)

function searchRecipes() {
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

    <RecipeList :show-material="false" :recipes="matches" :material="material" />
  </div>
</template>
