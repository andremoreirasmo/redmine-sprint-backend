import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProjectsApiRedmineService from '@modules/apiRedmine/services/ListProjectsApiRedmineService';
import ListActivitiesApiRedmineService from '@modules/apiRedmine/services/ListActivitiesApiRedmineService';

export default class ApiRedmineController {
  public async getProjects(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { url_redmine, api_key_redmine } = request.headers;
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
    const { url_redmine, api_key_redmine } = request.headers;
    const listActivitiesApiRedmine = container.resolve(
      ListActivitiesApiRedmineService,
    );

    const acvities = await listActivitiesApiRedmine.execute({
      url: url_redmine as string,
      apiKey: api_key_redmine as string,
    });

    return response.json(acvities);
  }
}
