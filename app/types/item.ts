export type ActionItem = "buy" | "remove"

export interface InventoryItem {
  id: string
  name: string
  icon: string
  weight: number
  quantity: number
}
