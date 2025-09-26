import { STORAGE_KEY } from "@/constants/storage"
import type { InventoryItem } from "@/types/item"

export const useInventory = () => {
  const items = ref<InventoryItem[]>(loadFromStorage())

  function loadFromStorage(): InventoryItem[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  }

  const saveToStorage = (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  const addItem = (newItem: InventoryItem): void => {
    const existing = items.value.find((item) => item.id === newItem.id)
    if (existing) {
      existing.quantity += newItem.quantity
    } else {
      items.value.push({ ...newItem })
    }

    saveToStorage()
  }

  const removeItem = (id: string): void => {
    items.value = items.value.filter((item) => item.id !== id)
    saveToStorage()
  }

  return {
    items,
    totalQuantity: computed<number>(() =>
      items.value.reduce((sum, item) => sum + item.quantity, 0)
    ),
    totalWeight: computed<number>(() =>
      items.value.reduce((sum, item) => sum + item.weight * item.quantity, 0)
    ),
    addItem,
    removeItem,
  }
}
