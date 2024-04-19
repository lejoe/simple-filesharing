<script setup>
const activeDrag = ref(false);
const fileInputEl = ref(null);
const props = defineProps({
  uploading: {
    type: Boolean,
  },
});
const emit = defineEmits(["onFilesDropped", "onFilesSelected"]);

const startDrag = () => {
  activeDrag.value = true;
};

const leaveDrag = () => {
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
        for="dropzone-files"
        :class="[
          'flex flex-col items-center justify-center w-full h-48  border border-dashed rounded-lg cursor-pointer border-gray-300',
          { 'bg-stone-800 border-pink-400 hover:cursor-copy': activeDrag },
          {
            'bg-stone-900  ': !activeDrag,
          },
        ]"
        @drop.prevent="handleDrop"
        @dragenter="startDrag"
        @dragover.prevent="() => {}"
        @dragleave="leaveDrag"
      >
        <div
          class="flex flex-col items-center justify-center pt-5 pb-6 text-sm"
        >
          <span
            class="i-[mdi--cloud-upload-outline] min-h-10 min-w-10 flex items-center"
          />
          <p class="pointer-events-none">
            {{ props.uploading ? "Uploading ..." : "Drag and drop" }}
          </p>
          <p class="pointer-events-none my-3">— Or —</p>
          <button
            class="border-slate-300 border hover:bg-stone-700 py-2 px-4 rounded cursor cursor-pointer disabled:opacity-50"
            @click="openFileSelector"
          >
            Select files
          </button>
          <input
            id="dropzone-files"
            ref="fileInputEl"
            type="file"
            multiple
            class="hidden"
            @change="handleFilesSelected"
          />
        </div>
      </label>
    </div>
    <div class="mt-2">
      <p class="text-xs text-gray-400">Max 10 files, Max 10MB per file</p>
    </div>
  </div>
</template>
