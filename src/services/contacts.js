import createHttpError from 'http-errors';
import { ContactColection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../contacts/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactColection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite !== null) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactsQuery.where('userId').equals(userId);

  const [contactsCount, contacts] = await Promise.all([
    ContactColection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContact = async ({ contactId, userId }) => {
  console.log(`Fetching contact with ID: ${contactId} for userID: ${userId}`);

  const contact = await ContactColection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await ContactColection.create({ ...payload, userId: userId });
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

// const contactsCount = await ContactColection.find()
//   .merge(contactsQuery)
//   .countDocuments();

// const contacts = await contactsQuery
//   .skip(skip)
//   .limit(limit)
//   // .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
//   .sort({ [sortBy]: sortOrder })
//   .exec();
