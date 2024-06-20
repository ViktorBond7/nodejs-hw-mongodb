import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth.js';

const autchRouter = Router();
autchRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

autchRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

export default autchRouter;

// import { Router } from 'express';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { registerUserSchema } from '../validation/auth.js';
// import { registerUserController } from '../controllers/auth.js';
// import { validateBody } from '../middlewares/validateBody.js';

// const router = Router();

// router.post(
//   '/register',
//   validateBody(registerUserSchema),
//   ctrlWrapper(registerUserController),
// );

// export default router;
