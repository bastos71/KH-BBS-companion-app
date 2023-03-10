<script setup lang="ts">
import { computed } from 'vue'
// @ts-ignore
import { useBBSStore } from '@/stores/bbs'
// @ts-ignore
import type { Character, Command, Material, Perk, Rank, Recipe } from '@/types'

const props = withDefaults(
  defineProps<{
    recipe: Recipe
    material?: Material
    showPerkTag?: boolean
    showMaterial?: boolean
  }>(),
  {
    showPerkTag: true,
    showMaterial: true
  }
)

const bbsStore = useBBSStore()

const commands = bbsStore.commands
const characters = bbsStore.characters
const perks = bbsStore.perks
const ranks = bbsStore.ranks
const materials = bbsStore.materials

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
    (Object as any).values(props.recipe.charactersIds).includes(character.apiId)
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

interface PerkAndMaterial {
  perk: Perk
  material: Material
}

const availablePerks = computed(() => {
  const availablePerks = perks
    .filter((perk: Perk) => {
      return perk.rankIds.includes(props.recipe.rankId)
    })
    .reduce((acc: PerkAndMaterial[], perk: Perk) => {
      acc.push({
        perk: perk,
        material: materials.find((material: Material) => material.apiId === perk.materialId)
      })

      return acc
    }, [])

  availablePerks.sort((a: PerkAndMaterial, b: PerkAndMaterial) => {
    if (a.material.name < b.material.name) {
      return -1
    }
    if (a.material.name > b.material.name) {
      return 1
    }
    return 0
  })

  return availablePerks
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
    <div class="card-header">
      <span
        v-for="character in availableForCharacters"
        :key="character.apiId"
        class="character-picture"
        data-bs-toggle="tooltip"
        data-bs-title="Default tooltip"
      >
        <img :src="character.imageUrl" :alt="character.name" />
      </span>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ resultCommand.name }}</h5>
      <p class="card-text">{{ recipe.percentage }}% chances of success</p>
      <p class="card-text">
        <span class="fw-bold fst-italic">First Ingredient : </span>
        <span class="fst-italic">{{ firstCommand.name }}</span>
        <br />
        <span class="fw-bold fst-italic">Second Ingredient : </span>
        <span class="fst-italic">{{ secondCommand.name }}</span>
      </p>
      <p class="card-text" v-if="showMaterial">
        <span class="fw-bold fst-italic">Material : </span>
        <span class="fst-italic">
          <template v-if="material">{{ material.name }}</template>
          <template v-else>Unknown</template>
        </span>
      </p>
    </div>
    <div class="accordion accordion-flush">
      <div class="accordion-item">
        <h2 class="accordion-header" :id="`collapse-heading-${recipe.apiId}`">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapse-${recipe.apiId}`"
            aria-expanded="false"
            :aria-controls="`collapse-${recipe.apiId}`"
          >
            Available Perks list
          </button>
        </h2>
        <div
          :id="`collapse-${recipe.apiId}`"
          class="accordion-collapse collapse"
          :aria-labelledby="`collapse-heading-${recipe.apiId}`"
        >
          <div class="accordion-body p-0">
            <table class="table table-striped m-0">
              <tbody>
                <tr v-for="(availablePerk, key) in availablePerks" :key="key">
                  <td>{{ availablePerk.material.name }}</td>
                  <td>{{ availablePerk.perk.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <span v-if="rank" class="badge bg-secondary">Rank : {{ rank.name }}</span>

      <span v-if="showPerkTag" class="badge bg-secondary"
        >Perk :
        <span v-if="perk">{{ perk.name }}</span>
        <i v-else>None</i>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: end;
}

.character-picture {
  width: 2em;
  margin-left: 0.5em;

  img {
    max-width: 100%;
  }
}

.card-footer {
  .badge {
    margin-right: 0.5em;
  }
}
</style>
