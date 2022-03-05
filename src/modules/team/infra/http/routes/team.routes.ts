import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.use(isAuthenticated);

// teamRouter.get('/', teamController.index);

// teamRouter.get(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   teamController.show,
// );

teamRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      url: Joi.string().required(),
      apiKey: Joi.string().required(),
      project_import: Joi.number().required(),
    },
  }),
  teamController.create,
);

// teamRouter.put(
//   '/:id',
//   celebrate({
//     [Segments.BODY]: {
//       name: Joi.string().required(),
//       url: Joi.string().required(),
//       apiKey: Joi.string().required(),
//       project_import: Joi.number().required(),
//     },
//   }),
//   teamController.update,
// );

// teamRouter.delete(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   teamController.delete,
// );

export default teamRouter;
