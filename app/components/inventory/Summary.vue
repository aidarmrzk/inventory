<script setup lang="ts">
interface Props {
  totalQuantity: number
  totalWeight: number
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex justify-between gap-2 rounded-lg bg-muted p-4 text-sm font-medium mt-4"
  >
    <span>
      Предметов: <span class="whitespace-nowrap">{{ totalQuantity }} шт</span>
    </span>
    <span>
      Общий вес:
      <span class="whitespace-nowrap">{{ totalWeight.toFixed(2) }} кг</span>
    </span>
  </div>
</template>
