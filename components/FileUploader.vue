<script setup>
const uploading = ref(false);
const uploadedFiles = ref([]);

const shareFiles = async (evt) => {
  // TODO: add logic to save uploaded files and create a link
};

const uploadFile = async (newFiles) => {
  const filesToUpload = newFiles;

  try {
    uploading.value = true;

    if (!filesToUpload || filesToUpload.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const formData = new FormData();
    [...filesToUpload].forEach((file, index) => formData.append(index, file));

    const data = await $fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { uploadedFilesList } = data;

    if (Array.isArray(uploadedFilesList) && uploadedFilesList.length > 0) {
      uploadedFilesList.forEach((file) => {
        uploadedFiles.value.push(file);
      });
    }
  } catch (error) {
    // TODO: Replace alert with a more user-friendly error handling
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};
</script>

<template>
  <form
    @submit.prevent="shareFiles"
    class="max-w-xl px-8 py-10 bg-stone-900 shadow-md mx-auto text-slate-200 relative rounded-lg"
  >
    <h1 class="text-lg mb-8 font-black">SIMPLE FILE SHARING</h1>

    <FileDropZone
      :uploading="uploading"
      @onFilesDropped="uploadFile"
      @onFilesSelected="uploadFile"
      class="w-full mb-8"
    />

    <FileList :fileList="uploadedFiles" class="w-full mb-8"/>

    <div class="w-full mt-3 gap-1 flex flex-col">
      <input
        type="submit"
        class="bg-pink-700 enabled:hover:bg-pink-500 text-slate-100 enabled:hover:text-slate-100 font-bold py-2 px-4 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        :value="uploading ? 'Uploading ...' : 'Share files'"
        :disabled="uploading || uploadedFiles.length == 0"
      />
    </div>
  </form>
</template>
