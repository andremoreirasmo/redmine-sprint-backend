import ListTeamService from '@modules/team/services/ListTeamService';
import ShowTeamService from '@modules/team/services/ShowTeamService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTeamService from '../../../services/CreateTeamService';

export default class TeamController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { redmine_id } = request.params;
    const listTeams = container.resolve(ListTeamService);

    const teams = await listTeams.execute({ user_id, redmine_id });

    return response.json(teams);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { team_id } = request.params;

    const showTeam = container.resolve(ShowTeamService);

    const team = await showTeam.execute({ user_id, team_id });

    return response.json(team);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, redmine_id, hours_per_point, activities, categories } =
      request.body;

    const createTeam = container.resolve(CreateTeamService);
    const team = await createTeam.execute({
      name,
      redmine_id,
      hours_per_point,
      activities,
      categories,
    });

    return response.json(team);
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const user_id = request.user.id;
  //   const { id } = request.params;
  //   const { name, url, apiKey, project_import } = request.body;

  //   const updateTeam = container.resolve(UpdateTeamService);

  //   const team = await updateTeam.execute({
  //     user_id,
  //     id,
  //     name,
  //     url,
  //     apiKey,
  //     project_import,
  //   });

  //   const importUsersTeamService = container.resolve(ImportUsersTeamService);
  //   await importUsersTeamService.execute(team);

  //   return response.json(team);
  // }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const user_id = request.user.id;
  //   const { id } = request.params;

  //   const deleteTeam = container.resolve(DeleteTeamService);

  //   await deleteTeam.execute({ user_id, id });

  //   return response.status(204).json();
  // }
}
