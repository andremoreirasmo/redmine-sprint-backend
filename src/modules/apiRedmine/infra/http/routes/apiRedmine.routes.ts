import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import ApiRedmineController from '../controllers/ApiRedmineController';

const apiRedmineRouter = Router();
const apiRedmineController = new ApiRedmineController();

apiRedmineRouter.use(isAuthenticated);

apiRedmineRouter.get(
  '/projects',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      url_redmine: Joi.string().required(),
      api_key_redmine: Joi.string().required(),
    }).unknown(),
  }),
  apiRedmineController.getProjects,
);

export default apiRedmineRouter;
