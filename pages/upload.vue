<script setup>
import { ref, computed } from "vue";

const uploading = ref(false);
const uploadedFiles = ref([]);
const buttonText = computed(() => {
  if (uploading.value) return "Uploading ...";
  return "Share files";
});

// Adds all files to the DB and creates a "share" for it
const shareFiles = async () => {
  const filesToShare = uploadedFiles.value;

  try {
    const createdShare = await $fetch("/api/share", {
      method: "POST",
      body: JSON.stringify({ status: "active" }),
    });

    if (!createdShare.newShare && !createdShare.newShare.lastInsertRowid) {
      throw new Error("Share creation failed.");
    }

    const shareID = createdShare.newShare.lastInsertRowid;

    const result = await Promise.all(
      filesToShare.map(uploadedFileToDBFile).map(async (file) => {
        return $fetch("/api/file", {
          method: "POST",
          body: JSON.stringify({
            ...file,
            share_id: shareID,
          }),
        });
      }),
    );
    // TODO: redirect to share page
    console.log(result);
  } catch (error) {
    // TODO: Replace alert with a more user-friendly error handling
    alert(error.message);
  }
};

// Uploads files to S3 and stores their links
const uploadFile = async (newFiles) => {
  const filesToUpload = newFiles;

  uploading.value = true;

  try {
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
    class="max-w-xl px-8 py-10 bg-stone-900 shadow-md mx-auto text-slate-200 relative rounded-lg"
    @submit.prevent="shareFiles"
  >
    <h1 class="text-lg mb-8 font-black">SIMPLE FILE SHARING</h1>

    <FileDropZone
      :uploading="uploading"
      class="w-full mb-8"
      @on-files-dropped="uploadFile"
      @on-files-selected="uploadFile"
    />

    <FileList :file-list="uploadedFiles" class="w-full mb-8" />

    <div class="w-full mt-3 gap-1 flex flex-col">
      <input
        type="submit"
        class="bg-pink-700 enabled:hover:bg-pink-500 text-slate-100 enabled:hover:text-slate-100 font-bold py-2 px-4 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        :value="buttonText"
        :disabled="uploading || uploadedFiles.length == 0"
      />
    </div>
  </form>
</template>
