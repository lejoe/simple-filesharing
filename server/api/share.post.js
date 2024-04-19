import { useDb } from "../utils/database";
import { shares } from "../database/schemas/shares";

export default defineEventHandler(async (evt) => {
  const db = await useDb();
  const body = await readBody(evt);
  const newShare = {
    ...body,
  };

  try {
    const result = db.insert(shares).values(newShare).run();
    return { newShare: result };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
});
