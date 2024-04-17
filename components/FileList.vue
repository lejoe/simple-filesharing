<script setup>
    const props = defineProps(['fileList'])
</script>

<template>
  <div
    :class="[
      'w-full mb-6 gap-1 flex flex-col',
      { hidden: !props.fileList.length },
    ]"
  >
    <div
      v-for="(file, index) in props.fileList"
      class="w-full bg-stone-800 border-gray-500 shadow-sm py-4 px-2 border rounded-lg"
    >
      <label class="flex justify-between">
        <p class="text-xs">{{ file.originalFilename }}</p>
        <p class="text-xs text-gray-400">{{ bytesToSize(file.size) }}</p>
        <input type="text" v-model="file.location" :key="index" class="hidden" />
      </label>
    </div>
  </div>
</template>