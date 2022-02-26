import { Router } from 'express';
import RedmineController from '../controllers/RedmineController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const redmineRouter = Router();
const redmineController = new RedmineController();

redmineRouter.use(isAuthenticated);

redmineRouter.get('/', redmineController.index);

redmineRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  redmineController.show,
);

redmineRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      url: Joi.string().required(),
      apiKey: Joi.string().required(),
      project_import: Joi.number().required(),
    },
  }),
  redmineController.create,
);

redmineRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      url: Joi.string().required(),
      apiKey: Joi.string().required(),
      project_import: Joi.number().required(),
    },
  }),
  redmineController.update,
);

redmineRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  redmineController.delete,
);

export default redmineRouter;
