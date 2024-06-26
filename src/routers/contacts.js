import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactController,
  patchContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/createContacts.js';
import { validateMongoId } from '../middlewares/valideteMongoId.js';
import { updateContactSchema } from '../validation/updateContacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../contacts/index.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.use('/:contactId', validateMongoId('contactId'));

contactsRouter.get(
  '/',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  ctrlWrapper(getAllContactsController),
);

contactsRouter.get(
  '/:contactId',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getContactController),
);

contactsRouter.post(
  '/',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.delete(
  '/:contactId',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(deleteContactController),
);

contactsRouter.patch(
  '/:contactId',
  checkRoles(ROLES.TEACHER),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default contactsRouter;
