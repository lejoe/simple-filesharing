/**
 * Converts bytes to a human-readable size format.
 * @param {number} bytes - The number of bytes to convert.
 * @returns {string} The converted size in a human-readable format.
 */
export const bytesToSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  const size = bytes / Math.pow(1024, i);
  const roundedSize = Math.round(size * 100) / 100;
  if (i === 0 || Number.isInteger(roundedSize)) {
    return `${Math.round(size)} ${sizes[i]}`;
  } else {
    return `${roundedSize.toFixed(2)} ${sizes[i]}`;
  }
};

export const uploadedFileToDBFile = (uploadedFile) => {
  return {
    url: uploadedFile.location,
    new_filename: uploadedFile.newFilename,
    original_filename: uploadedFile.originalFilename,
    mimetype: uploadedFile.mimetype,
    size: uploadedFile.size,
  };
};
