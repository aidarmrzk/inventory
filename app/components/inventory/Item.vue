<script setup lang="ts">
import { Plus, Trash2 } from "lucide-vue-next"
import type { InventoryItem } from "@/types/item"

interface Props {
  item: InventoryItem
}

interface Emits {
  (e: "remove", value: InventoryItem): void
  (e: "buy", value: InventoryItem): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div
    class="flex flex-col sm:grid sm:grid-cols-6 items-center gap-2 sm:gap-4 p-3"
  >
    <NuxtImg
      :src="item.icon"
      alt=""
      class="h-12 w-12 rounded-md object-cover self-center"
    />

    <div class="text-center sm:text-left sm:col-span-2 font-medium">
      {{ item.name }}
    </div>

    <div class="text-center sm:text-left">
      <span class="inline sm:hidden">Количество: </span>{{ item.quantity }}
    </div>

    <div class="text-center sm:text-left">
      <span class="inline sm:hidden">Масса: </span
      >{{ (item.weight * item.quantity).toFixed(2)
      }}<span class="inline sm:hidden"> кг</span>
    </div>

    <div class="flex justify-between">
      <Button size="icon" variant="ghost" @click="$emit('buy', item)">
        <Plus class="h-4 w-4 text-primary" />
      </Button>
      <Button size="icon" variant="ghost" @click="$emit('remove', item)">
        <Trash2 class="h-4 w-4 text-destructive" />
      </Button>
    </div>
  </div>
</template>
