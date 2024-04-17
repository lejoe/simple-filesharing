<script setup>
const activeDrag = ref(false);
const props = defineProps(["uploading"]);
const emit = defineEmits(["onFilesDropped", "onFilesSelected"]);

const startDrag = (evt) => {
  activeDrag.value = true;
};

const leaveDrag = (evt) => {
  activeDrag.value = false;
};

const handleFilesSelected = (evt) => {
  const filesToUpload = evt.target.files;
  emit("onFilesSelected", filesToUpload);
  evt.target.value = "";
};

const handleDrop = (evt) => {
  const filesToUpload = evt.dataTransfer.files;
  activeDrag.value = false;
  emit("onFilesDropped", filesToUpload);
};
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <label
      @drop.prevent="handleDrop"
      @dragenter="startDrag"
      @dragover.prevent="() => {}"
      @dragleave="leaveDrag"
      for="dropzone-files"
      :class="[
        'flex flex-col items-center justify-center w-full h-48  border border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-pink-400 hover:bg-stone-800',
        { 'bg-stone-800 border-pink-400': activeDrag },
        {
          'bg-stone-900  ':
            !activeDrag,
        },
      ]"
    >
      <div
        class="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none"
      >
        <p class="pointer-events-none mb-2">
          {{ props.uploading ? "Uploading ..." : "Drag and drop" }}
        </p>
        <input
          id="dropzone-files"
          type="file"
          @change="handleFilesSelected"
          multiple
          class="hidden"
        />
      </div>
    </label>
  </div>
  <div class="mt-2 mb-6">
    <p class="text-xs text-gray-400">Max 10 files, Max 10MB per file</p>
  </div>
</template>
