import path from 'node:path';
import fs from 'node:fs/promises';
import { env } from '../utils/env.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../contacts/index.js';

// export const saveFileToUploadDir = async (file) => {
//   await fs.rename(
//     path.join(TEMP_UPLOAD_DIR, file.fileneme),
//     path.join(UPLOAD_DIR, file.fileneme),
//   );
//   return `${env('APP_DOMAIN')}/uploads/${file.fileneme}`;
// };

export const saveFileToUploadDir = async (file) => {
  const content = await fs.readFile(file.path);
  const newPath = path.join(UPLOAD_DIR, file.filename);
  await fs.writeFile(newPath, content);
  await fs.unlink(file.path);

  return env('APP_FRONTEND') + `/uploads/${file.filename}`;
};
