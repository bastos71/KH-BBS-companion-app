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
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ resultCommand.name }}</h5>
      <p class="card-text">{{ recipe.percentage }}% chances of success</p>
      <p class="card-text">
        <i><b>First Ingredient :</b> {{ firstCommand.name }}</i>
        <br />
        <i><b>Second Ingredient :</b> {{ secondCommand.name }}</i>
      </p>
    </div>
    <div class="card-footer">
      <span v-if="rank" class="badge bg-secondary">Rank : {{ rank.name }}</span>

      <span class="badge bg-secondary"
        >Perk :
        <span v-if="perk">{{ perk.name }}</span>
        <i v-else>None</i>
      </span>

      <span
        v-for="character in availableForCharacters"
        :key="character.apiId"
        class="badge bg-secondary"
        >{{ character.name }}</span
      >
    </div>
  </div>
</template>
