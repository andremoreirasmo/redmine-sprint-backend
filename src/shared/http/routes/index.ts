import redmineRouter from '@modules/redmine/routes/redmine.routes';
import passwordRouter from '@modules/user/routes/password.routes';
import sessionsRouter from '@modules/user/routes/sessions.routes';
import userRouter from '@modules/user/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/redmine', redmineRouter);
routes.use('/user', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
