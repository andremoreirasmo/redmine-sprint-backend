import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProjectsApiRedmineService from '@modules/apiRedmine/services/ListProjectsApiRedmineService';
import ListActivitiesApiRedmineService from '@modules/apiRedmine/services/ListActivitiesApiRedmineService';
import ShowRedmineService from '@modules/redmine/services/ShowRedmineService';

export default class ApiRedmineController {
  public async getProjects(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { url_redmine, api_key_redmine } = request.query;
    const listProjectsApiRedmine = container.resolve(
      ListProjectsApiRedmineService,
    );

    const projects = await listProjectsApiRedmine.execute({
      url: url_redmine as string,
      apiKey: api_key_redmine as string,
    });

    return response.json(projects);
  }

  public async getActvities(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { redmine_id } = request.query;

    const listActivitiesApiRedmine = container.resolve(
      ListActivitiesApiRedmineService,
    );

    const showRedmine = container.resolve(ShowRedmineService);

    const redmine = await showRedmine.execute({
      user_id,
      id: redmine_id as string,
    });

    const acvities = await listActivitiesApiRedmine.execute({
      url: redmine.url,
      apiKey: redmine.apiKey,
    });

    return response.json(acvities);
  }
}
