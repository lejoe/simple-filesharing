import { readFiles } from "h3-formidable";
import { PassThrough } from "stream";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const { S3_URL, S3_ACCESS_KEY, S3_SECRET_KEY, S3_REGION, S3_BUCKET } =
  process.env;
const s3Client = new S3Client({
  endpoint: S3_URL,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
  region: S3_REGION,
});
const UPLOADFOLDER = "";
const MAX_FILESIZE = 1024 * 1024 * 10; // 10 MB
const MAX_FILES = 10;

// Uploads file to S3 and updates it's filename with the full new location
function uploadFileToS3(file, s3Uploads, s3Client) {
  const body = new PassThrough();
  const newFilename = UPLOADFOLDER + file.originalFilename;
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: S3_BUCKET,
      Key: newFilename,
      ContentType: file.mimetype ?? undefined,
      Body: body,
    },
  });

  const uploadRequest = upload.done().then((response) => {
    file.newFilename = newFilename;
    file.location = response.Location;
  });

  s3Uploads.push(uploadRequest);

  return body;
}

// Extracts the necessary details from the uploaded files
function getUploadedFileDetails(uploadedFiles) {
  return Object.values(uploadedFiles).flatMap((fileArray) =>
    fileArray.map(
      ({ location, newFilename, originalFilename, mimetype, size }) => ({
        location,
        newFilename,
        originalFilename,
        mimetype,
        size,
      })
    )
  );
}

export default defineEventHandler(async (event) => {
  const s3Uploads = [];

  try {
    // process each files using formidable
    const { files: uploadedFiles } = await readFiles(event, {
      maxFiles: MAX_FILES,
      maxFileSize: MAX_FILESIZE,
      maxTotalFileSize: MAX_FILES * MAX_FILESIZE,
      fileWriteStreamHandler: (file) =>
        uploadFileToS3(file, s3Uploads, s3Client),
    });

    await Promise.all(s3Uploads);

    return getUploadedFileDetails(uploadedFiles);
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "An error occurred while uploading the files!",
      data: error,
    });
  }
});
