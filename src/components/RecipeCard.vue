<script setup lang="ts">
import type Recipe from '@/types/Recipe'
import { computed } from 'vue'
import { useBBSStore } from '@/stores/bbs'
import type Command from '@/types/Command'
import type Character from '@/types/Character'
import type Material from '@/types/Material'
import type Perk from '@/types/Perk'
import type Rank from '@/types/Rank'

const props = defineProps<{
  recipe: Recipe
  material?: Material
}>()

const bbsStore = useBBSStore()

const commands = bbsStore.commands
const characters = bbsStore.characters
const perks = bbsStore.perks
const ranks = bbsStore.ranks

const resultCommand = computed(() => {
  return commands.find((command: Command) => command.apiId === props.recipe.resultId)
})

const firstCommand = computed(() => {
  return commands.find((command: Command) => command.apiId === props.recipe.firstIngredientId)
})

const secondCommand = computed(() => {
  return commands.find((command: Command) => command.apiId === props.recipe.secondIngredientId)
})

const availableForCharacters = computed(() => {
  return characters.filter((character: Character) =>
    Object.values(props.recipe.charactersIds).includes(character.apiId)
  )
})

const perk = computed(() => {
  if (!props.recipe.rankId || !props.material) {
    return null
  }

  return perks.find((perk: Perk) => {
    if (perk.materialId !== props.material?.apiId) {
      return null
    }

    return perk.rankIds.includes(props.recipe.rankId)
  })
})

const rank = computed(() => {
  if (!props.recipe.rankId) {
    return null
  }

  return ranks.find((localRank: Rank) => localRank.apiId === props.recipe.rankId)
})
</script>

<template>
  <div class="w-full rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ resultCommand.name }}</div>
      <p class="text-gray-700 text-base">{{ recipe.percentage }}% chances of success</p>
      <p class="text-gray-700 text-base">
        <i><b>First Ingredient :</b> {{ firstCommand.name }}</i>
      </p>
      <p class="text-gray-700 text-base">
        <i><b>Second Ingredient :</b> {{ secondCommand.name }}</i>
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span
        v-if="rank"
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >Rank : {{ rank.name }}</span
      >

      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >Perk :
        <span v-if="perk">{{ perk.name }}</span>
        <i v-else>None</i>
      </span>

      <span
        v-for="character in availableForCharacters"
        :key="character.apiId"
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >{{ character.name }}</span
      >
    </div>
  </div>
</template>
