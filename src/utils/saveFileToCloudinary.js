import { v2 as cloudinary } from 'cloudinary';
import { env } from '../utils/env.js';
import { CLOUDINARY } from '../contacts/index.js';
import fs from 'node:fs/promises';

cloudinary.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.uploader.upload(file.path);

    await fs.unlink(file.path);

    return response.secure_url;
  } catch (error) {
    await fs.unlink(file.path).catch((unlinkError) => {
      console.error('Failed to delete temp file:', unlinkError);
    });

    throw error;
  }
};
