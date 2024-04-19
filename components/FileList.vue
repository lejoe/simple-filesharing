<script setup>
const props = defineProps({
  fileList: {
    type: Array,
    default: null,
  },
});
</script>

<template>
  <div :class="['gap-2 flex flex-col', { hidden: !props.fileList.length }]">
    <div
      v-for="(file, index) in props.fileList"
      :key="index"
      class="w-full bg-stone-800 border-gray-500 shadow-sm py-4 px-2 border rounded-lg"
    >
      <label class="flex gap-2">
        <span class="i-[mdi--file] min-h-8 min-w-8 flex items-center" />
        <p class="text-xs min-h-8 grow flex items-center">
          {{ file.originalFilename }}
        </p>
        <p class="text-xs text-gray-400 min-h-8 min-w-14 flex items-center">
          {{ bytesToSize(file.size) }}
        </p>
        <input
          :key="index"
          v-model="file.location"
          type="text"
          class="hidden"
        />
      </label>
    </div>
  </div>
</template>
