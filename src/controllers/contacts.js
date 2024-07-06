import {
  createContact,
  deleteContact,
  getAllContacts,
  getContact,
  patchContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { ContactColection } from '../db/models/contacts.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  let contact = await getContact({ contactId, userId });
  let message;
  if (!contact) {
    // If contact with contactId is not found, try to find any contact with userId
    contact = await ContactColection.findOne({ userId });

    if (!contact) {
      next(
        createHttpError(
          404,
          `Contact with id ${contactId} not found and no contact found for user with id ${userId}`,
        ),
      );
      return;
    }
    message = `Successfully found contact for user with id ${userId} instead of contact id ${contactId}`;
  } else {
    message = `Successfully found contact with id ${contactId}!`;
  }

  res.status(200).json({
    status: 200,
    message,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { body, file } = req;

  const contact = await createContact({ ...body, photo: file }, req.user._id);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await deleteContact({ contactId, userId });

  if (contact.deletedAll) {
    res.status(200).json({
      status: 200,
      message: 'All contacts for the user have been deleted',
    });
    return;
  }

  if (!contact.deletedOne) {
    next(
      createHttpError(
        404,
        `Contact with id ${contactId} not found and no contact found for user with id ${userId}`,
      ),
    );
    return;
  }
  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  const result = await patchContact(
    contactId,
    {
      ...req.body,
      photo: photoUrl,
    },
    userId,
  );

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};
