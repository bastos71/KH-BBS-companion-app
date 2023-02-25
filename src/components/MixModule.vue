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
    <div class="w-full">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="first_ingredient">
            First Ingredient
          </label>
          <select
            v-model="firstIngredient"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="first_ingredient"
          >
            <option :value="null">Please select an option</option>
            <option v-for="command in commands" :key="command.apiId" :value="command">
              {{ command.name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="second_ingredient">
            Second Ingredient
          </label>
          <select
            v-model="secondIngredient"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="second_ingredient"
          >
            <option :value="null">Please select an option</option>
            <option v-for="command in commands" :key="command.apiId" :value="command">
              {{ command.name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="material">
            Material
          </label>
          <select
            v-model="material"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="second_ingredient"
          >
            <option :value="null">Please select an option</option>
            <option v-for="material in materials" :key="material.apiId" :value="material">
              {{ material.name }}
            </option>
          </select>
        </div>
      </form>
    </div>

    <template v-if="matches.length > 0">
      <RecipeCard
        :recipe="match"
        :material="material"
        v-for="match in matches"
        :key="match.apiId"
      />
    </template>
    <div v-else class="w-full rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">No recipe found</div>
      </div>
    </div>
  </div>
</template>
