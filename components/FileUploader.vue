<script setup>
const uploading = ref(false);
const files = ref();
const uploadedFiles = ref([]);

const shareFiles = async (evt) => {
  // TODO add logic to save uploaded files and create a link
};

const uploadFile = async (evt) => {
  files.value = evt.target.files;
  try {
    uploading.value = true;

    if (!files.value || files.value.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const formData = new FormData();
    Array.from(files.value).map((file, index) => formData.append(index, file));

    const data = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { uploadedFilesList } = await data.json();

    if (Array.isArray(uploadedFilesList) && uploadedFilesList.length > 0) {
      uploadedFilesList.forEach((file) => {
        uploadedFiles.value.push(file);
      });
    }
  } catch (error) {
    // TODO: Handle error
    alert(error.message);
  } finally {
    evt.target.value = "";
    files.value = {};
    uploading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="shareFiles">
    <div>
      <label for="file">
        {{ uploading ? "Uploading ..." : "Drag and drop: " }}
        <input id="file" type="file" @change="uploadFile" multiple />
      </label>
      <div>
        <div v-for="(file, index) in uploadedFiles">
          <input v-model="file.location" :key="index" />
        </div>
      </div>
      <input
        type="submit"
        :value="uploading ? 'Uploading ...' : 'Share files'"
        :disabled="uploading"
      />
    </div>
  </form>
</template>
