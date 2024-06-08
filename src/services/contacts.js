import createHttpError from 'http-errors';
import { ContactColection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactColection.find();
  return contacts;
};

export const getContact = async (contactId) => {
  const contact = await ContactColection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactColection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactColection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const patchContact = async (contactId, payload) => {
  const contact = await ContactColection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
    },
  );

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};
