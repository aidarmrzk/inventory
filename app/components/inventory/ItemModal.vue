<script setup lang="ts">
import type { ActionItem, InventoryItem } from "@/types/item"

interface Props {
  item: InventoryItem | null
  action: ActionItem
}

interface Emits {
  (e: "close"): void
  (e: "buy", id: string, count: number): void
  (e: "remove", id: string, count: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const model = defineModel<boolean>({ required: true })

const ACTIONS = {
  buy: {
    title: "Докупить предмет",
    buttonText: "Купить",
    callback: (id: string) => emits("buy", id, count.value),
  },
  remove: {
    title: "Удалить предмет",
    buttonText: "Удалить",
    callback: (id: string) => emits("remove", id, count.value),
  },
}

const count = ref<number>(1)

const resetCount = (): void => {
  count.value = 1
}

const close = (): void => {
  emits("close")
  resetCount()
}

const handleClick = (): void => {
  if (!props.item) {
    return
  }

  ACTIONS[props.action].callback(props.item.id)
  close()
}
</script>

<template>
  <Dialog v-if="item" v-model:open="model" @update:open="resetCount">
    <DialogContent class="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>{{ ACTIONS[action].title }}</DialogTitle>
      </DialogHeader>

      <div class="flex flex-col gap-2">
        <InventoryItemCard
          v-if="item"
          v-model="count"
          :item="item"
          :min="1"
          :max="action === 'remove' ? item.quantity : undefined"
        />
        <Button
          v-if="action === 'remove' && item.quantity > 1"
          variant="secondary"
          size="sm"
          @click="count = item.quantity"
        >
          Выбрать все
        </Button>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="close">Отмена</Button>
        <Button @click="handleClick">{{ ACTIONS[action].buttonText }}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
