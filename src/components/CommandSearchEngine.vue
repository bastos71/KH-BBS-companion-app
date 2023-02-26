<script setup lang="ts">
import RecipeList from '@/components/RecipeList.vue'
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
        <select v-model="command" id="character" class="form-select">
          <option :value="null">Please select an option</option>
          <option v-for="commandItem in commands" :key="commandItem.apiId" :value="commandItem">
            {{ commandItem.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Character</label>
        <select v-model="character" id="character" class="form-select">
          <option :value="null">Please select an option</option>
          <option
            v-for="characterItem in characters"
            :key="characterItem.apiId"
            :value="characterItem"
          >
            {{ characterItem.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Perk</label>
        <select v-model="perk" id="perk" class="form-select">
          <option :value="null">Please select an option</option>
          <option v-for="perkItem in perks" :key="perkItem.apiId" :value="perkItem">
            {{ perkItem.name }}
          </option>
        </select>
      </div>
    </form>

    <RecipeList :material="material" :show-perk-tag="false" :recipes="matches" />
  </div>
</template>
