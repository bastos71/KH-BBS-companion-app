<script setup lang="ts">
import RecipeList from './RecipeList.vue'
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
    <form class="search-form">
      <div class="row">
        <div class="col-md-4">
          <div class="mb-3">
            <label class="form-label">First Ingredient</label>
            <v-select :options="commands" label="name" v-model="firstIngredient"></v-select>
          </div>
        </div>

        <div class="col-md-4">
          <div class="mb-3">
            <label class="form-label">Second Ingredient</label>
            <v-select :options="commands" label="name" v-model="secondIngredient"></v-select>
          </div>
        </div>

        <div class="col-md-4">
          <div class="mb-3">
            <label class="form-label">Material</label>
            <v-select :options="materials" label="name" v-model="material"></v-select>
          </div>
        </div>
      </div>
    </form>

    <RecipeList :show-material="false" :recipes="matches" :material="material" />
  </div>
</template>
