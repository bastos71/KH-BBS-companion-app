<script setup lang="ts">
import RecipeList from './RecipeList.vue'
// @ts-ignore
import { useBBSStore } from '@/stores/bbs'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
// @ts-ignore
import type { Character, Command, Material, Perk, Recipe } from '@/types'

const bbsStore = useBBSStore()

const recipes = bbsStore.recipes
const perks = bbsStore.perks
const materials = bbsStore.materials
const characters = bbsStore.characters
const commands = bbsStore.commands

let perk: Ref<Perk | null> = ref(null)

let matches: Ref<Recipe[]> = ref([])
let material: Ref<Material | null> = ref(null)
let character: Ref<Character | null> = ref(null)
let command: Ref<Command | null> = ref(null)

watch(perk, searchRecipes)
watch(character, searchRecipes)
watch(command, searchRecipes)

function searchRecipes() {
  material.value = materials.find((material: Material) => material.apiId === perk.value?.materialId)

  matches.value = recipes.filter((recipe: Recipe) => {
    const matchPerk = perk.value ? perk.value.rankIds.includes(recipe.rankId) : true

    const matchCharacter = character.value
      ? recipe.charactersIds.includes(character.value?.apiId)
      : true

    const matchCommand = command.value ? recipe.resultId === command.value?.apiId : true

    return matchPerk && matchCharacter && matchCommand
  })
}
</script>

<template>
  <div>
    <form>
      <div class="mb-3">
        <label class="form-label">Command</label>
        <v-select :options="commands" label="name" v-model="command"></v-select>
      </div>

      <div class="mb-3">
        <label class="form-label">Character</label>
        <v-select :options="characters" label="name" v-model="character"></v-select>
      </div>

      <div class="mb-3">
        <label class="form-label">Perk</label>
        <v-select :options="perks" label="name" v-model="perk"></v-select>
      </div>
    </form>

    <RecipeList :material="material" :show-perk-tag="false" :recipes="matches" />
  </div>
</template>
