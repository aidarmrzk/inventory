<script setup lang="ts">
import { Store } from "lucide-vue-next"
import { SHOP_ITEMS } from "@/constants/items"
import type { InventoryItem } from "@/types/item"

interface Emits {
  (e: "close"): void
  (e: "buy", items: InventoryItem[]): void
}

const emits = defineEmits<Emits>()

const model = defineModel<boolean>({ required: true })

const selected = ref<Record<string, number>>({})

const buy = (): void => {
  const chosenItems = SHOP_ITEMS.filter(
    (item) => (selected.value[item.id] ?? 0) > 0
  ).map((item) => ({
    ...item,
    quantity: selected.value[item.id] ?? 0,
  }))

  if (!chosenItems.length) {
    return
  }

  emits("buy", chosenItems)
  emits("close")
  selected.value = {}
}
</script>

<template>
  <Dialog v-model:open="model">
    <DialogContent class="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <Store /> Магазин
        </DialogTitle>
      </DialogHeader>

      <div
        class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2"
      >
        <InventoryItemCard
          v-for="item in SHOP_ITEMS"
          :key="item.id"
          v-model="selected[item.id]"
          :item="item"
        />
      </div>

      <DialogFooter>
        <Button variant="outline" @click="emits('close')">Отмена</Button>
        <Button @click="buy">Купить</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
