// import express from 'express';
import { TEMP_UPLOAD_DIR } from './contacts/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import setupServer from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  // await createDirIfNotExists(UPLOAD_DIR);
};

bootstrap();
