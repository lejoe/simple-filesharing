<script setup>
const uploading = ref(false)
const files = ref()

const uploadFile = async (evt) => {
  files.value = evt.target.files
  try {
    uploading.value = true

    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    console.log(files.value);
    const formData = new FormData();
    Array.from(files.value).map((file, index) => formData.append(index, file));

    // TODO: Upload files
    
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}

</script>

<template>
  <form>
    <div>
      <label for="file">{{ uploading ? 'Uploading ...' : 'File to upload: ' }}</label>
      <input id="file" type="file" @change="uploadFile" multiple />
    </div>
  </form>
</template>