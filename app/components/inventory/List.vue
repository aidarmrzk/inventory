<script setup lang="ts">
import { Backpack, Store } from "lucide-vue-next"
import type { ActionItem, InventoryItem } from "@/types/item"

const { items, totalQuantity, totalWeight, addItem, removeItem } =
  useInventory()

const selectedItem = ref<InventoryItem | null>(null)
const shopOpen = ref(false)
const itemModalOpen = ref(false)
const actionItemModal = ref<ActionItem>("buy")

const handleRemove = (id: string, qty: number): void => {
  const removedItem = items.value.find((item) => item.id === id)
  if (!removedItem) {
    return
  }

  removedItem.quantity -= qty
  if (removedItem.quantity <= 0) {
    removeItem(id)
  }
}

const handleAdd = (id: string, qty: number): void => {
  const addedItem = items.value.find((item) => item.id === id)
  if (!addedItem) {
    return
  }

  addedItem.quantity += qty
}

const openItemModal = (item: InventoryItem, action: ActionItem): void => {
  selectedItem.value = item
  actionItemModal.value = action
  itemModalOpen.value = true
}

const addItems = (items: InventoryItem[]): void => {
  items.forEach(addItem)
}
</script>

<template>
  <div class="flex flex-col p-4 max-w-2xl mx-auto h-full">
    <h2 class="flex gap-2 text-xl font-bold mb-4"><Backpack /> Инвентарь</h2>

    <div class="overflow-auto border rounded-l-lg">
      <div class="rounded-lg divide-y">
        <div
          class="sticky top-0 left-0 hidden sm:grid sm:grid-cols-6 items-center gap-4 p-3 bg-background rounded-t-lg"
        >
          <span></span>
          <span>Наименование</span>
          <span></span>
          <span>Кол-во</span>
          <span class="whitespace-nowrap">Масса, кг</span>
        </div>
        <div v-for="item in items" :key="item.id">
          <InventoryItem
            v-model="item.quantity"
            :item="item"
            @buy="openItemModal($event, 'buy')"
            @remove="openItemModal($event, 'remove')"
          />
        </div>
        <div v-if="!items.length" class="p-3 text-center">Пусто</div>
      </div>
    </div>

    <InventorySummary
      :total-quantity="totalQuantity"
      :total-weight="totalWeight"
    />

    <div class="mt-4 flex">
      <Button class="flex-1" size="lg" @click="shopOpen = true">
        <Store />
        Купить
      </Button>
    </div>

    <ShopModal v-model="shopOpen" @buy="addItems" @close="shopOpen = false" />

    <InventoryItemModal
      v-model="itemModalOpen"
      :item="selectedItem"
      :action="actionItemModal"
      @buy="handleAdd"
      @remove="handleRemove"
      @close="itemModalOpen = false"
    />
  </div>
</template>
