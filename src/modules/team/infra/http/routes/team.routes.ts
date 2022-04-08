import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.use(isAuthenticated);

teamRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      redmine_id: Joi.string().uuid().required(),
    },
  }),
  teamController.index,
);

teamRouter.get(
  '/:team_id',
  celebrate({
    [Segments.PARAMS]: {
      team_id: Joi.string().uuid().required(),
    },
  }),
  teamController.show,
);

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
            .items(
              Joi.object()
                .keys({
                  id: Joi.number().required(),
                })
                .unknown(),
            )
            .required()
            .min(1),
        })
        .required(),
      categories: Joi.array()
        .items({
          name: Joi.string().required(),
          productive: Joi.boolean().required(),
          redmine_categories: Joi.array()
            .items(
              Joi.object()
                .keys({
                  id: Joi.number().required(),
                })
                .unknown(),
            )
            .required(),
        })
        .required()
        .min(1),
      users_redmine: Joi.array()
        .items(
          Joi.object()
            .keys({
              id: Joi.string().uuid().required(),
            })
            .unknown(),
        )
        .required()
        .min(1),
    },
  }),
  teamController.create,
);

teamRouter.put(
  '/:team_id',
  celebrate({
    [Segments.PARAMS]: {
      team_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      redmine_id: Joi.string().required(),
      hours_per_point: Joi.number().required(),
      activities: Joi.array()
        .items({
          name: Joi.string().required(),
          redmine_activities: Joi.array()
            .items(Joi.number().required())
            .required(),
        })
        .required(),
      categories: Joi.array()
        .items({
          name: Joi.string().required(),
          productive: Joi.boolean().required(),
          redmine_categories: Joi.array()
            .items(Joi.number().required())
            .required(),
        })
        .required(),
      users_redmine: Joi.array()
        .items({
          id: Joi.string().uuid().required(),
        })
        .required(),
    },
  }),
  teamController.update,
);

teamRouter.delete(
  '/:team_id',
  celebrate({
    [Segments.PARAMS]: {
      team_id: Joi.string().uuid().required(),
    },
  }),
  teamController.delete,
);

export default teamRouter;
