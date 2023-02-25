export default interface Recipe {
  apiId: string
  id: Number
  resultId: string
  firstIngredientId: string
  secondIngredientId: string
  rankId: string | null
  percentage: Number
  charactersIds: string[]
}
