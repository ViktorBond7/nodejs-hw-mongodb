import { Router } from 'express';
import autchRouter from './auth.js';
import contactsRouter from './contacts.js';

const rootRouter = Router();

rootRouter.use('/contacts', contactsRouter);
rootRouter.use('/auth', autchRouter);

export default rootRouter;

// import { Router } from 'express';
// import studentsRouter from './students.js';
// import authRouter from './auth.js';

// const router = Router();

// router.use('/students', studentsRouter);
// router.use('/auth', authRouter);

// export default router;
