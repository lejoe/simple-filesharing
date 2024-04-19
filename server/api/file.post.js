import { useDb } from "../utils/database";
import { files } from "../database/schemas/files";

export default defineEventHandler(async (evt) => {
  const db = await useDb();
  const body = await readBody(evt);
  const newFile = {
    ...body,
  };

  try {
    const result = db.insert(files).values(newFile).run();
    return { newFile: result };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
});
