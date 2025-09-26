<script setup lang="ts">
import type { InventoryItem } from "@/types/item"

interface Props {
  item: InventoryItem
  min?: number
  max?: number
}

withDefaults(defineProps<Props>(), {
  min: 0,
})

const model = defineModel<number | undefined>({ required: true })
</script>

<template>
  <Card class="p-0" :class="model && model > 0 && 'bg-primary/20'">
    <CardContent
      class="flex flex-col justify-between items-center gap-2 p-3 h-full"
    >
      <div class="flex flex-col items-center gap-2">
        <NuxtImg :src="item.icon" alt="" class="h-16 w-16 object-contain" />
        <div class="text-sm font-medium text-center">{{ item.name }}</div>
        <div class="text-xs text-muted-foreground">{{ item.weight }} кг</div>
      </div>
      <NumberField v-model="model" :default-value="0" :min="min" :max="max">
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    </CardContent>
  </Card>
</template>
