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
    [Segments.QUERY]: {
      url_redmine: Joi.string().required(),
      api_key_redmine: Joi.string().required(),
    },
  }),
  apiRedmineController.getProjects,
);

apiRedmineRouter.get(
  '/activities',
  celebrate({
    [Segments.QUERY]: {
      redmine_id: Joi.string().uuid().required(),
    },
  }),
  apiRedmineController.getActvities,
);

apiRedmineRouter.get(
  '/categories',
  celebrate({
    [Segments.QUERY]: {
      redmine_id: Joi.string().uuid().required(),
    },
  }),
  apiRedmineController.getCategories,
);

export default apiRedmineRouter;
