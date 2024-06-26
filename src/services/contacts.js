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
  const contact = await ContactColection.findOne({
    _id: contactId,
    userId,
  });
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await ContactColection.create({ ...payload, userId: userId });
  return contact;
};

export const deleteContact = async ({ contactId, userId }) => {
  const result = await ContactColection.deleteOne({
    _id: contactId,
    userId,
  });

  if (result.deletedCount === 0) {
    const userContactsResult = await ContactColection.deleteMany({ userId });
    return { deletedAll: userContactsResult.deletedCount > 0 };
  }

  return { deletedOne: true };
};

export const patchContact = async (contactId, payload, userId) => {
  let contact = await ContactColection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );

  if (!contact) {
    contact = await ContactColection.findOneAndUpdate({ userId }, payload, {
      new: true,
    });

    if (!contact) {
      return null;
    }
  }
  return contact;
};
