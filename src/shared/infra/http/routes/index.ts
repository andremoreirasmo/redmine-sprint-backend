import redmineRouter from '@modules/redmine/infra/http/routes/redmine.routes';
import passwordRouter from '@modules/user/infra/http/routes/password.routes';
import profileRouter from '@modules/user/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import teamRouter from '@modules/team/infra/http/routes/team.routes';
import { Router } from 'express';
import apiRedmineRouter from '@modules/apiRedmine/infra/http/routes/apiRedmine.routes';

const routes = Router();

routes.use('/redmine', redmineRouter);
routes.use('/apiredmine', apiRedmineRouter);
routes.use('/user', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/team', teamRouter);

export default routes;
