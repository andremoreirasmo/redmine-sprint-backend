import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProjectsApiRedmineService from '@modules/redmine/services/ListProjectsApiRedmineService';

export default class ApiRedmineController {
  public async getProjects(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { url_redmine, api_key_redmine } = request.headers;
    const listProjectsApiRedmine = container.resolve(
      ListProjectsApiRedmineService,
    );

    const redmines = await listProjectsApiRedmine.execute({
      url: url_redmine as string,
      apiKey: api_key_redmine as string,
    });

    return response.json(redmines);
  }
}
