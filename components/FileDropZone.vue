<script setup>
const activeDrag = ref(false);
const fileInputEl = ref(null)
const props = defineProps(["uploading"]);
const emit = defineEmits(["onFilesDropped", "onFilesSelected"]);

const startDrag = (evt) => {
  activeDrag.value = true;
};

const leaveDrag = (evt) => {
  activeDrag.value = false;
};

const openFileSelector = () => {
  fileInputEl.value.click();
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
  <div>
    <div class="flex items-center justify-center">
      <label
        @drop.prevent="handleDrop"
        @dragenter="startDrag"
        @dragover.prevent="() => {}"
        @dragleave="leaveDrag"
        for="dropzone-files"
        :class="[
          'flex flex-col items-center justify-center w-full h-48  border border-dashed rounded-lg cursor-pointer border-gray-300',
          { 'bg-stone-800 border-pink-400 hover:cursor-copy': activeDrag },
          {
            'bg-stone-900  ': !activeDrag,
          },
        ]"
      >
        <div
          class="flex flex-col items-center justify-center pt-5 pb-6 text-sm"
        >
          <span
            class="i-[mdi--cloud-upload-outline] min-h-10 min-w-10 flex items-center"
          ></span>
          <p class="pointer-events-none">
            {{ props.uploading ? "Uploading ..." : "Drag and drop" }}
          </p>
          <p class="pointer-events-none my-3">— Or —</p>
          <button @click="openFileSelector" class="border-slate-300 border hover:bg-stone-700 py-2 px-4 rounded cursor cursor-pointer disabled:opacity-50">Select files</button>
          <input
            ref="fileInputEl"
            id="dropzone-files"
            type="file"
            @change="handleFilesSelected"
            multiple
            class="hidden"
          />
        </div>
      </label>
    </div>
    <div class="mt-2">
      <p class="text-xs text-gray-400">Max 10 files, Max 10MB per file</p>
    </div>
  </div>
</template>
