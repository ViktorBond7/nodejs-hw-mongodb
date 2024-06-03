import { ContactColection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactColection.find();
  return contacts;
};

export const getContact = async (contactId) => {
  const contact = await ContactColection.findById(contactId);
  return contact;
};
