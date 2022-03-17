import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import TeamController from '../controllers/TeamController';

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
      redmine_id: Joi.string().required(),
      hours_per_point: Joi.number().required(),
      activities: Joi.array()
        .items({
          name: Joi.string().required(),
          redmine_activities: Joi.array()
            .items({ redmine_activity_id: Joi.number().required() })
            .required(),
        })
        .required(),
      categories: Joi.array()
        .items({
          name: Joi.string().required(),
          productive: Joi.boolean().required(),
          redmine_categories: Joi.array()
            .items({ redmine_category_id: Joi.number().required() })
            .required(),
        })
        .required(),
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
