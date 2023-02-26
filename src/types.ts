interface Character {
  apiId: string
  name: string
  initial: string
}

interface Command {
  apiId: string
  name: string
  charactersIds: string[]
}

interface Material {
  apiId: string
  name: string
}

interface Perk {
  apiId: string
  name: string
  materialId: string
  rankIds: string[]
}

interface Rank {
  apiId: string
  name: string
}

interface Recipe {
  apiId: string
  id: Number
  resultId: string
  firstIngredientId: string
  secondIngredientId: string
  rankId: string | null
  percentage: Number
  charactersIds: string[]
}

export type { Character, Command, Material, Perk, Rank, Recipe }
