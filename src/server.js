import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import { env } from './utils/env.js';
import rootRouter from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './contacts/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

// import mongoose from 'mongoose';
// import { ENV_VARS } from './contacts/index.js';

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cookieParser());

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/api-docs', swaggerDocs());

  app.use(rootRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

export default setupServer;
