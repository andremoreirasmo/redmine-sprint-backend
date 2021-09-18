import redmineRouter from '@modules/redmine/routes/redmine.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/redmine', redmineRouter);

export default routes;
