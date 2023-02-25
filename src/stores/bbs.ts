import Airtable from 'airtable'
import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type Command from '@/types/Command'
import type Character from '@/types/Character'
import type Material from '@/types/Material'
import type Rank from '@/types/Rank'
import type Perk from '@/types/Perk'
import type Recipe from '@/types/Recipe'

const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_API_TOKEN }).base(
  import.meta.env.VITE_AIRTABLE_BASE_ID
)

export const useBBSStore = defineStore('bbs', () => {
  const characters: Character[] = reactive([])
  const ranks: Rank[] = reactive([])
  const materials: Material[] = reactive([])
  const perks: Perk[] = reactive([])
  const commands: Command[] = reactive([])
  const recipes: Recipe[] = reactive([])

  base('characters')
    .select({
      view: 'grid'
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          characters.push({
            apiId: record.id,
            name: record.get('name'),
            initial: record.get('initial')
          })
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )

  base('ranks')
    .select({
      view: 'grid'
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          ranks.push({
            apiId: record.id,
            name: record.get('name')
          })
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )

  base('materials')
    .select({
      view: 'grid'
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          materials.push({
            apiId: record.id,
            name: record.get('name') as string
          })
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )

  base('perks')
    .select({
      view: 'grid'
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          perks.push({
            apiId: record.id,
            name: record.get('name'),
            materialId: record.get('material')[0],
            rankIds: record.get('ranks')
          })
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )

  base('commands')
    .select({
      view: 'grid'
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          commands.push({
            apiId: record.id,
            name: record.get('name') as string,
            charactersIds: record.get('characters')
          })
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )

  base('recipes')
    .select({
      view: 'grid'
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          recipes.push({
            apiId: record.id,
            id: record.get('id'),
            resultId: record.get('result_command')[0],
            firstIngredientId: record.get('first_command')[0],
            secondIngredientId: record.get('second_command')[0],
            rankId: record.get('rank') ? record.get('rank')[0] : null,
            percentage: record.get('percentage'),
            charactersIds: record.get('characters')
          })
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )

  return { characters, ranks, materials, perks, commands, recipes }
})
