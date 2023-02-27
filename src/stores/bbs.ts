import Airtable from 'airtable'
import { reactive } from 'vue'
import { defineStore } from 'pinia'
// @ts-ignore
import type { Character, Command, Material, Perk, Rank, Recipe } from '@/types'

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
          const image = record.get('image') as any[]

          characters.push({
            apiId: record.id,
            id: record.get('uniqid'),
            name: record.get('name'),
            initial: record.get('initial'),
            imageUrl: image ? (image[0] as any).url : null
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
          const material = record.get('material') as string[]

          perks.push({
            apiId: record.id,
            name: record.get('name'),
            materialId: material ? material[0] : null,
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
          const resultCommand = record.get('result_command') as string[]
          const firstCommand = record.get('first_command') as string[]
          const secondCommand = record.get('second_command') as string[]
          const rank = record.get('rank') as string[]

          recipes.push({
            apiId: record.id,
            id: record.get('id'),
            resultId: resultCommand ? resultCommand[0] : null,
            firstIngredientId: firstCommand ? firstCommand[0] : null,
            secondIngredientId: secondCommand ? secondCommand[0] : null,
            rankId: rank ? rank[0] : null,
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
