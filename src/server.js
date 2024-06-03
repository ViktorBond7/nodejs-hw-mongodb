import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import errorMiddlware from './middlewares/errorMiddleware.js';
import notFoundtMiddleware from './middlewares/notFoundMiddleware.js';
import { env } from './utils/env.js';
import { getAllContacts, getContact } from './services/contacts.js';
import mongoose from 'mongoose';
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

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({ data: 'ID is not valid' });
    }

    const contact = await getContact(contactId);
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use(notFoundtMiddleware);
  app.use(errorMiddlware);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

export default setupServer;
